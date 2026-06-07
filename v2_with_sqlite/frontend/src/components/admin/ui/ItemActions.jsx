import { Edit, Trash2 } from 'lucide-react';

const ItemActions = ({ onEdit, onDelete }) => (
  <div className="flex gap-1 shrink-0">
    <button
      onClick={onEdit}
      className="p-1.5 bg-violet-500/15 hover:bg-violet-500/25 text-violet-400 rounded-lg transition-colors cursor-pointer"
      title="Edit"
    >
      <Edit size={12} />
    </button>
    <button
      onClick={onDelete}
      className="p-1.5 bg-red-500/15 hover:bg-red-500/25 text-red-400 rounded-lg transition-colors cursor-pointer"
      title="Delete"
    >
      <Trash2 size={12} />
    </button>
  </div>
);

export default ItemActions;
