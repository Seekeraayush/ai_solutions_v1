import { Edit, Trash2 } from 'lucide-react';

const ItemActions = ({ onEdit, onDelete }) => (
  <div className="flex gap-1 shrink-0">
    <button
      onClick={onEdit}
      className="p-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors cursor-pointer"
      title="Edit"
    >
      <Edit size={12} />
    </button>
    <button
      onClick={onDelete}
      className="p-1.5 bg-red-50 hover:bg-red-100 text-red-500 rounded-lg transition-colors cursor-pointer"
      title="Delete"
    >
      <Trash2 size={12} />
    </button>
  </div>
);

export default ItemActions;
