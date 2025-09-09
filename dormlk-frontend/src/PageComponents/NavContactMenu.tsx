import React from 'react';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu.tsx"; // Adjust the import path as needed
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const contactMethods = [
    {
        title: "Quick Chat",
        description: "Online",
        icon: "💬",
        href: "",
    },
    {
        title: "WhatsApp",
        icon: <FontAwesomeIcon icon={faWhatsapp} style={{color: "#63E6BE",}} />,
        href: "https://wa.me/+94721636568",
    },
    {
        title: "Messenger",
        icon: <FontAwesomeIcon icon={faFacebookMessenger} style={{color: "#3e9eff",}} />,
        href: "",
    },
    {
        title: "Email",
        icon: <FontAwesomeIcon icon={faEnvelope} style={{color: "#000"}} />,
        href: "mailto:contact.dorms@gmail.com",
    },
];

const quickLinks = [
    { title: "Help Center", href: "/help-center" },
    { title: "How It Works", href: "/how-it-works" },
];

export default function NavContactMenu() {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="hover:bg-gray-200 rounded-md p-3 text-gray-700 font-semibold">
                        Contact Us
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="flex gap-8 p-6 bg-white rounded-lg shadow-lg w-96">
                        <div className="flex-1">
                            <h3 className="font-semibold text-lg">Support Now</h3>
                            <ul className="grid gap-3">
                                {contactMethods.map((method) => (
                                    <li key={method.title}>
                                        <NavigationMenuLink asChild>
                                            <a href={method.href} className="block p-3 rounded-md bg-gray-50 hover:bg-gray-100 transition flex items-center">
                                                <span className="mr-2">{method.icon}</span>
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-gray-800 whitespace-nowrap">{method.title}</span>
                                                    {method.description && (
                                                        <span className="text-sm text-green-500">{method.description}</span>
                                                    )}
                                                </div>
                                            </a>
                                        </NavigationMenuLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-lg">Quick Links</h3>
                            <ul className="grid gap-3">
                                {quickLinks.map((link) => (
                                    <li key={link.title}>
                                        <NavigationMenuLink asChild>
                                            <Link to={link.href} className="block p-3 rounded-md bg-gray-50 hover:bg-gray-100 transition">
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-gray-800 whitespace-nowrap">{link.title}</span>
                                                </div>
                                            </Link>
                                        </NavigationMenuLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}

