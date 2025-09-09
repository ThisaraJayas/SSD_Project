import React from "react";
import { Box, Flex, IconButton } from "@chakra-ui/react";
import { MoveLeftIcon, MoveRightIcon } from "lucide-react";

const ChakraCarousel = ({ children, gap }) => {
  const [scrollIndex, setScrollIndex] = React.useState(0);
  const scrollRef = React.useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      setScrollIndex(Math.max(0, scrollIndex - 1));
      scrollRef.current.scrollTo({
        left: scrollLeft - clientWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setScrollIndex(Math.min(scrollWidth - clientWidth, scrollIndex + 1));
      scrollRef.current.scrollTo({
        left: scrollLeft + clientWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <Flex position="relative">
      <IconButton
        icon={<MoveLeftIcon />}
        aria-label="Scroll left"
        position="absolute"
        left={0}
        top="50%"
        transform="translateY(-50%)"
        zIndex={1}
        onClick={scrollLeft}
      />
      <Box
        ref={scrollRef}
        overflowX="scroll"
        overflowY="hidden"
        whiteSpace="nowrap"
        display="flex"
        gap={gap}
        sx={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {children}
      </Box>
      <IconButton
        icon={<MoveRightIcon />}
        aria-label="Scroll right"
        position="absolute"
        right={0}
        top="50%"
        transform="translateY(-50%)"
        zIndex={1}
        onClick={scrollRight}
      />
    </Flex>
  );
};

export default ChakraCarousel;
