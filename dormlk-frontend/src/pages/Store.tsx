import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPosts, filterPostBySearchFilter } from '@/Redux/Post/PostAction.ts';
import { AppDispatch, RootState } from '@/Redux/store.ts';
import StoreItem from '@/PageComponents/StoreItem.tsx';
import { Box, Button, Flex, Text, SimpleGrid, Select } from '@chakra-ui/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Footer from '@/PageComponents/Footer.tsx';

interface Post {
  _id: string;
  title: string;
  cityDistrict: string;
  accommodationType: string;
  createdDateTime: Date;
  price:string;
  postStatus: string;
}

const ITEMS_PER_PAGE = 9;

export default function Store() {
  const dispatch = useDispatch<AppDispatch>();
  const { allPost } = useSelector((state: RootState) => state.Post);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedDateSort, setSelectedDateSort] = useState('');
  const location = useLocation();
  const navigate = useNavigate()

  // Function to parse query parameters
  const getQueryParams = () => {
    const params = new URLSearchParams(location.search);
    const accommodationType = params.get('accommodationType');
    const district = params.get('district');
    return { accommodationType, district };
  };

  const { accommodationType, district } = getQueryParams();

  useEffect(() => {
    if (accommodationType && district) {
      dispatch(filterPostBySearchFilter({ district, accommodationType }));
    } else {
      dispatch(fetchAllPosts());
    }
  }, [dispatch, accommodationType, district]);

  useEffect(() => {
    const query = new URLSearchParams(location.search).get('query');
    if (query) {
      setSearchQuery(decodeURIComponent(query));
    } else {
      setSearchQuery('');
    }
  }, [location.search]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocation = e.target.value;
    navigate('/store')
    setSelectedLocation(newLocation);
  };

  const handleDateSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    navigate('/store')
    setSelectedDateSort(e.target.value);
  };

  const filterAndSortPosts = (posts: Post[]) => {
    let filteredPosts = posts
      .filter(post => post.postStatus === "ACCEPTED")
      .filter(post => post.title.toLowerCase().includes(searchQuery.toLowerCase()))
      .filter(post => selectedLocation ? post.cityDistrict === selectedLocation : true);

    if (selectedDateSort === 'newest') {
      filteredPosts = filteredPosts.sort((a, b) => new Date(b.createdDateTime).getTime() - new Date(a.createdDateTime).getTime());
    } else if (selectedDateSort === 'oldest') {
      filteredPosts = filteredPosts.sort((a, b) => new Date(a.createdDateTime).getTime() - new Date(b.createdDateTime).getTime());
    }

    return filteredPosts;
  };

  const filteredPosts = filterAndSortPosts(allPost);
  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);
  const currentItems = filteredPosts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <Box p={4} mx={{ base: 2, md: 4, lg: 8 }}>
        <Text fontSize="2xl" className="sm:mt-['20%']"  mt={{ base: '15%', md: '5%' }} mb={4}>Find Property</Text>
        
        {/* Filter Controls */}
        <Flex mb={4}  justifyContent="space-between" alignItems="center">
          <Select placeholder="Select Location" onChange={handleLocationChange} value={selectedLocation} width="47%">
          <option value="Colombo">Colombo</option>
          <option value="Kandy">Kandy</option>
          <option value="Jaffna">Jaffna</option>
          <option value="Matara">Matara</option>
          <option value="Rathnapura">Rathnapura</option>
          <option value="Gampaha">Gampaha</option>
          <option value="Galle">Galle</option>
          <option value="Nuwara Eliya">Nuwara Eliya</option>
          <option value="Ampara">Ampara</option>
          <option value="Anuradhapura">Anuradhapura</option>
          <option value="Badulla">Badulla</option>
          <option value="Batticaloa">Batticaloa</option>
          <option value="Hambantota">Hambantota</option>
          <option value="Kalutara">Kalutara</option>
          <option value="Kegalle">Kegalle</option>
          <option value="Kilinochchi">Kilinochchi</option>
          <option value="Kurunegala">Kurunegala</option>
          <option value="Mannar">Mannar</option>
          <option value="Matale">Matale</option>
          <option value="Monaragala">Monaragala</option>
          <option value="Mullaitivu">Mullaitivu</option>
          <option value="Polonnaruwa">Polonnaruwa</option>
          <option value="Puttalam">Puttalam</option>
          <option value="Trincomalee">Trincomalee</option>
          <option value="Vavuniya">Vavuniya</option>

          </Select>

          <Select placeholder="Sort by Date" onChange={handleDateSortChange} value={selectedDateSort} width="47%">
            <option value="newest">Newest to Oldest</option>
            <option value="oldest">Oldest to Newest</option>
          </Select>
        </Flex>

        {/* Posts Grid */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} ml={'5%'} mr={'5%'} mb={4}>
          {currentItems.length ? (
            currentItems.map(post => (
              <Link to={`/store/${post._id}`}>
              <StoreItem key={post._id} post={post} />
              </Link>
            ))
          ) : (
            <Text>No posts found.</Text>
          )}
        </SimpleGrid>

        {/* Pagination Controls */}
        <Flex justify="center" align="center">
          <Button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            isDisabled={currentPage === 1}
            mr={2}
          >
            Previous
          </Button>
          <Text mx={4}>
            Page {currentPage} of {totalPages}
          </Text>
          <Button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            isDisabled={currentPage === totalPages}
            ml={2}
          >
            Next
          </Button>
        </Flex>
      </Box>
      <Footer/>
    </>
  );
}
