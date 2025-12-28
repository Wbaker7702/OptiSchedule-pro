import { Employee, Product, HeatmapDataPoint, DepartmentMetric } from './types';

export const CURRENT_USER = "Wesley Baker";
export const STORE_NUMBER = "5065";
export const DATE_STRING = "Saturday, December 13, 2025";
export const APP_VERSION = "3.0.0-enterprise";

export const SYSTEM_HEALTH = {
  status: 'Operational',
  uptime: '99.99%',
  latency: '18ms',
  environment: 'Production',
  railsVersion: '7.1.3',
  syncCycle: '00:04:12'
};

// Metrics derived from "The Scaling Formula" & "Fiscal Foundation"
export const FISCAL_METRICS = {
  avgPayRate: 14.00,
  targetWeeklyHoursRecapture: 186,
  executionLeakage: 90000, // Per week in "Execution Leakage"
  currentROI: 10.3, // "For every $1 invested we protect $10.30"
  annualRecoveryTarget: 4.68, // Millions
  vision2028: 491, // Millions (Enterprise Opportunity)
  laborSurplusPct: 15, // "Identifying a 15% labor surplus"
};

export const OPERATIONAL_AUDITS = [
  { id: 'aud-101', severity: 'error', code: 'LEAK_01', message: 'Efficiency Variance > 15% detected in Front End', file: 'Department: Front End', fix: 'Apply Zone Defense' },
  { id: 'aud-102', severity: 'warning', code: 'SYNC_04', message: 'HubSpot Lead Sync Latency (240ms)', file: 'Integration: HS_API', fix: 'Flush Sync Buffer' },
  { id: 'aud-103', severity: 'info', code: 'OPT_09', message: 'Optimal staffing achieved for peak hour', file: 'Schedule: Sat_12_15', fix: 'No action' },
  { id: 'aud-104', severity: 'error', code: 'STOCK_02', message: 'Critical Inventory Gap during Traffic Surge', file: 'Inventory: Grocery', fix: 'Prioritize Stocking' },
  { id: 'aud-105', severity: 'warning', code: 'LABOR_02', message: 'Predictive Surplus: 12.5 hrs available at 2 PM', file: 'Department: Apparel', fix: 'Reassign to Stocking' },
];

export const HUBSPOT_ROI_DATA = {
  marketingLeads: { value: 150, label: "Marketing Leads", subtext: "+150% Growth" },
  websiteVisitors: { value: 133, label: "Website Visitors", subtext: "+2.1B Visitors/Yr" },
  dealsCreated: { value: 26, label: "Deals Created", subtext: "+80.43 Deals/Yr" },
  revenue: { value: 150, label: "Revenue Growth", subtext: "Marketing Driven" }
};

export const EMPLOYEES: Employee[] = [
  { id: '1', name: 'John Smith', role: 'Senior Cashier', department: 'Front End', status: 'Active', performance: 4.8, email: 'john.smith@store.com', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' },
  { id: '2', name: 'Maria Chen', role: 'Floor Manager', department: 'Grocery', status: 'Active', performance: 4.6, email: 'maria.chen@store.com', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
  { id: '3', name: 'Alex Davis', role: 'Tech Specialist', department: 'Electronics', status: 'Training', performance: 4.3, email: 'alex.davis@store.com', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
  { id: '4', name: 'Sarah Johnson', role: 'Cashier', department: 'Front End', status: 'Active', performance: 4.5, email: 'sarah.j@store.com', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
  { id: '5', name: 'Kevin Lee', role: 'Sales Associate', department: 'Apparel', status: 'Active', performance: 4.1, email: 'kevin.lee@store.com', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop' },
  { id: '6', name: 'Lisa Wilson', role: 'Stock Clerk', department: 'Grocery', status: 'On Leave', performance: 4.4, email: 'lisa.w@store.com', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop' },
  { id: '7', name: 'Robert Brown', role: 'Warehouse Lead', department: 'Home Goods', status: 'Active', performance: 4.7, email: 'robert.b@store.com', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop' },
  { id: '8', name: 'Tom Garcia', role: 'Pharmacist', department: 'Pharmacy', status: 'Active', performance: 4.9, email: 'tom.garcia@store.com', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop' },
];

export const INVENTORY_DATA: Product[] = [
  { id: '1', name: 'iPhone 15 Pro', sku: 'ELEC-001', category: 'Electronics', stock: 45, reorderPoint: 20, status: 'Good' },
  { id: '2', name: 'Organic Whole Milk', sku: 'GROC-105', category: 'Grocery', stock: 12, reorderPoint: 25, status: 'Low' },
  { id: '3', name: 'Men\'s Denim Jeans', sku: 'APPR-055', category: 'Apparel', stock: 120, reorderPoint: 50, status: 'Good' },
  { id: '4', name: 'Sony 4K TV 55"', sku: 'ELEC-022', category: 'Electronics', stock: 8, reorderPoint: 10, status: 'Low' },
  { id: '5', name: 'Ceramic Coffee Mug', sku: 'HOME-003', category: 'Home Goods', stock: 200, reorderPoint: 30, status: 'Good' },
  { id: '6', name: 'Multivitamin Complex', sku: 'PHAR-112', category: 'Pharmacy', stock: 5, reorderPoint: 15, status: 'Critical' },
  { id: '7', name: 'Wireless Headphones', sku: 'ELEC-089', category: 'Electronics', stock: 35, reorderPoint: 15, status: 'Good' },
  { id: '8', name: 'Running Shoes', sku: 'APPR-201', category: 'Apparel', stock: 18, reorderPoint: 20, status: 'Low' },
  { id: '9', name: 'Bath Towel Set', sku: 'HOME-101', category: 'Home Goods', stock: 65, reorderPoint: 25, status: 'Good' },
  { id: '10', name: 'Fresh Salmon', sku: 'GROC-330', category: 'Grocery', stock: 4, reorderPoint: 10, status: 'Critical' },
];

export const HEATMAP_DATA: HeatmapDataPoint[] = [
  { hour: '8 AM', transactionVolume: 45, staffing: 8, efficiency: 85 },
  { hour: '9 AM', transactionVolume: 65, staffing: 10, efficiency: 75 },
  { hour: '10 AM', transactionVolume: 120, staffing: 12, efficiency: 45 },
  { hour: '11 AM', transactionVolume: 150, staffing: 12, efficiency: 30 },
  { hour: '12 PM', transactionVolume: 180, staffing: 14, efficiency: 25 },
  { hour: '1 PM', transactionVolume: 160, staffing: 14, efficiency: 35 },
  { hour: '2 PM', transactionVolume: 110, staffing: 12, efficiency: 55 },
  { hour: '3 PM', transactionVolume: 90, staffing: 10, efficiency: 70 },
  { hour: '4 PM', transactionVolume: 140, staffing: 10, efficiency: 40 },
  { hour: '5 PM', transactionVolume: 170, staffing: 12, efficiency: 30 },
];

export const DEPARTMENT_METRICS: DepartmentMetric[] = [
  { 
    name: 'Front End', 
    activeStaff: '12/15', 
    sales: '$42,350', 
    extraMetricLabel: 'Efficiency', 
    extraMetricValue: '94%',
    waitTime: '3m 12s' 
  },
  { 
    name: 'Electronics', 
    activeStaff: '4/5', 
    sales: '$28,920', 
    extraMetricLabel: 'Attach Rate', 
    extraMetricValue: '28%',
    waitTime: '5m 45s' 
  },
  { 
    name: 'Grocery', 
    activeStaff: '8/10', 
    sales: '$31,680', 
    extraMetricLabel: 'Stock Level', 
    extraMetricValue: '88%',
    waitTime: '1m 30s'
  },
  { 
    name: 'Apparel', 
    activeStaff: '3/4', 
    sales: '$15,240', 
    extraMetricLabel: 'Recovery', 
    extraMetricValue: '92%',
    waitTime: '4m 15s'
  },
  { 
    name: 'Home Goods', 
    activeStaff: '2/3', 
    sales: '$5,890', 
    extraMetricLabel: 'Returns', 
    extraMetricValue: '2.4%',
    waitTime: '2m 50s'
  },
  { 
    name: 'Pharmacy', 
    activeStaff: '2/2', 
    sales: '$1,350', 
    extraMetricLabel: 'Scripts', 
    extraMetricValue: '142',
    waitTime: '8m 20s'
  },
];