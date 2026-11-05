// All admin/CMS screens live behind this single entry point, which App.jsx loads
// with React.lazy(). That keeps every admin component, table name and query out
// of the public visitor bundle: it is only downloaded when someone visits /admin.
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import AdminGuard from '../../components/admin/AdminGuard';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import AdminHomeContent from './AdminHomeContent';
import AdminTeam from './AdminTeam';
import AdminIndustrialContent from './AdminIndustrialContent';
import AdminFoodContent from './AdminFoodContent';
import AdminChemicalsContent from './AdminChemicalsContent';
import AdminManpowerContent from './AdminManpowerContent';
import AdminContactSettings from './AdminContactSettings';
import AdminTellabsContent from './AdminTellabsContent';
import AdminAboutContent from './AdminAboutContent';
import AdminLeads from './AdminLeads';
import AdminBlogs from './AdminBlogs';
import AdminBlogEditor from './AdminBlogEditor';

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="login" element={<AdminLogin />} />

      <Route element={<AdminGuard><Outlet /></AdminGuard>}>
        <Route index element={<AdminDashboard />} />
        <Route path="home" element={<AdminHomeContent />} />
        <Route path="team" element={<AdminTeam />} />
        <Route path="verticals/industrial" element={<AdminIndustrialContent />} />
        <Route path="verticals/food" element={<AdminFoodContent />} />
        <Route path="verticals/chemicals" element={<AdminChemicalsContent />} />
        <Route path="verticals/manpower" element={<AdminManpowerContent />} />
        <Route path="verticals/tellabs" element={<AdminTellabsContent />} />
        <Route path="verticals/about" element={<AdminAboutContent />} />
        <Route path="settings" element={<AdminContactSettings />} />
        <Route path="leads" element={<AdminLeads />} />
        <Route path="blogs" element={<AdminBlogs />} />
        <Route path="blogs/new" element={<AdminBlogEditor />} />
        <Route path="blogs/:id" element={<AdminBlogEditor />} />
      </Route>

      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}
