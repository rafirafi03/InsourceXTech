import { useEffect, useState } from 'react';
import { useDeleteSolutionMutation, useGetAdminSolutionsQuery } from '../../store/slices/apiSlices';
import AdminLayout from './AdminLayout';
import { Trash } from 'lucide-react';
import { IService } from '../../types';
import Modal from '../../components/Admin/Modal/confimModal';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Services() {

  const navigate = useNavigate()
  const { data, error } = useGetAdminSolutionsQuery(undefined);
  const [solutions, setSolutions] = useState<IService[]>([]);
  const [deleteSolution] = useDeleteSolutionMutation();

  const [deleteId, setDeleteId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (error && "status" in error && error.status === 401) {
      localStorage.removeItem("adminToken");
      navigate("/login");
    }
  }, [error, navigate]);

  useEffect(() => {
    if (data) {
      setSolutions(data.solutions);
    }
  }, [data]);

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {

    const loadingToast = toast.loading('deleting...')
    try {
      const res = await deleteSolution(deleteId).unwrap();

      toast.dismiss(loadingToast)

      if(res.success) {
        toast.success('deleted successfully')
        setSolutions(solutions.filter(solution => solution._id!== deleteId));
      } else {
        if (res.status == 401) {
          toast.warning("session expired! logging out...");
          localStorage.removeItem("adminToken");
          navigate("/login");
        }
        toast.error("something went wrong!");
      }

      // If you want to update the UI immediately without waiting for a refetch
    } catch (error) {
      toast.dismiss(loadingToast)
      toast.error('something went wrong')
      console.error('Failed to delete solution:', error);
    }
  };

  const handleNavigation = () => {
    navigate('/addSolutions')
  };

  return (
    <AdminLayout>
      <div className="p-6">
        {solutions && solutions.length > 0 ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Solutions</h1>
              <button 
                onClick={handleNavigation}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Add Solution
              </button>
            </div>
            <div className="overflow-x-auto bg-white rounded-lg shadow">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {solutions.map((solution: IService, index) => (
                    <tr key={solution._id || index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img 
                          src={solution.image} 
                          alt={solution.title} 
                          className="h-12 w-20 object-cover rounded"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{solution.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button 
                          onClick={() => handleDeleteClick(solution._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500 text-lg mb-6">No services available</p>
            <button 
              onClick={handleNavigation}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Add Service
            </button>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Solution"
        message="Are you sure you want to delete this solution? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </AdminLayout>
  );
}