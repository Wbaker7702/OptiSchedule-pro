import { Employee, Product, HeatmapDataPoint, DepartmentMetric } from './types';

export const CURRENT_USER = "Wesley Baker";
export const STORE_NUMBER = "5065";
export const DATE_STRING = "Saturday, December 13, 2025";

// Metrics derived from "The Scaling Formula" & "Fiscal Foundation" notes + PDF Updates
export const FISCAL_METRICS = {
  avgPayRate: 14.00,
  targetWeeklyHoursRecapture: 186,
  executionLeakage: 90000, // Per week in "Execution Leakage"
  currentROI: 10.3, // "For every $1 invested we protect $10.30"
  annualRecoveryTarget: 4.68, // Millions
  vision2028: 491, // Millions (Updated from Slide 11: "Enterprise Opportunity $491M")
  laborSurplusPct: 15, // "Identifying a 15% labor surplus"
};

export const HUBSPOT_ROI_DATA = {
  marketingLeads: { value: 150, label: "Marketing Leads", subtext: "+150% Growth" },
  websiteVisitors: { value: 133, label: "Website Visitors", subtext: "+2.1B Visitors/Yr" },
  dealsCreated: { value: 26, label: "Deals Created", subtext: "+80.43 Deals/Yr" },
  revenue: { value: 150, label: "Revenue Growth", subtext: "Marketing Driven" }
};

export const EMPLOYEES: Employee[] = [
  { id: '1', name: 'John Smith', role: 'Senior Cashier', department: 'Front End', status: 'Active', performance: 4.8, email: 'john.smith@store.com', avatar: 'https://picsum.photos/32/32?random=1' },
  { id: '2', name: 'Maria Chen', role: 'Floor Manager', department: 'Grocery', status: 'Active', performance: 4.6, email: 'maria.chen@store.com', avatar: 'https://picsum.photos/32/32?random=2' },
  { id: '3', name: 'Alex Davis', role: 'Tech Specialist', department: 'Electronics', status: 'Training', performance: 4.3, email: 'alex.davis@store.com', avatar: 'https://picsum.photos/32/32?random=3' },
  { id: '4', name: 'Sarah Johnson', role: 'Cashier', department: 'Front End', status: 'Active', performance: 4.5, email: 'sarah.j@store.com', avatar: 'https://picsum.photos/32/32?random=4' },
  { id: '5', name: 'Kevin Lee', role: 'Sales Associate', department: 'Apparel', status: 'Active', performance: 4.1, email: 'kevin.lee@store.com', avatar: 'https://picsum.photos/32/32?random=5' },
  { id: '6', name: 'Lisa Wilson', role: 'Stock Clerk', department: 'Grocery', status: 'On Leave', performance: 4.4, email: 'lisa.w@store.com', avatar: 'https://picsum.photos/32/32?random=6' },
  { id: '7', name: 'Robert Brown', role: 'Warehouse Lead', department: 'Home Goods', status: 'Active', performance: 4.7, email: 'robert.b@store.com', avatar: 'https://picsum.photos/32/32?random=7' },
  { id: '8', name: 'Tom Garcia', role: 'Pharmacist', department: 'Pharmacy', status: 'Active', performance: 4.9, email: 'tom.garcia@store.com', avatar: 'https://picsum.photos/32/32?random=8' },
];

export const INVENTORY_DATA: Product[] = [
  { id: '1', name: 'iPhone 15 Pro', sku: 'ELEC-001', category: 'Electronics', stock: 45, reorderPoint: 20, status: 'Good' },
  { id: '2', name: 'Organic Milk', sku: 'GROC-045', category: 'Grocery', stock: 234, reorderPoint: 150, status: 'Good' },
  { id: '3', name: 'Paper Towels', sku: 'HOME-089', category: 'Home Goods', stock: 8, reorderPoint: 25, status: 'Critical' },
  { id: '4', name: 'Nike Air Max', sku: 'APPR-234', category: 'Apparel', stock: 67, reorderPoint: 30, status: 'Good' },
  { id: '5', name: 'Coffee Maker', sku: 'HOME-156', category: 'Home Goods', stock: 28, reorderPoint: 15, status: 'Good' },
  { id: '6', name: 'Vitamin D3', sku: 'PHAR-078', category: 'Pharmacy', stock: 12, reorderPoint: 30, status: 'Low' },
  { id: '7', name: 'Wireless Mouse', sku: 'ELEC-189', category: 'Electronics', stock: 89, reorderPoint: 40, status: 'Good' },
];

export const HEATMAP_DATA: HeatmapDataPoint[] = [
  { hour: '8AM', transactionVolume: 10, staffing: 12, efficiency: 10 },
  { hour: '9AM', transactionVolume: 15, staffing: 12, efficiency: 20 },
  { hour: '10AM', transactionVolume: 25, staffing: 12, efficiency: 3