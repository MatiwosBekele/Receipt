import { FaChalkboardTeacher } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import { MdOutlineRateReview } from 'react-icons/md';

export const DashboardTop = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    path: '/shop/dashboard',
    icon: MdDashboard,
  },
  {
    key: 'Checkout',
    label: 'Your Challenges',
    path: '/shop/checkout',
    icon: FaChalkboardTeacher,
  },
  {
    key: 'User Profile',
    label: 'Review Challenges',
    path: '/shop/profile',
    icon: MdOutlineRateReview,
  },
];
