"use client"
import { useState } from 'react';
import {
  Home,
  Settings,
  Check,
  Delete,
  Save,
  MoveUp,
  MoveDown,
  Trash2,
  Calendar,
  Minus,
} from 'lucide-react';

// ✅ Define a Task interface
interface Task {
  id: string;
  title: string;
  createdBy: string;
  date: string;
  priority: 'high' | 'normal' | 'low';
  completed: boolean;
  userImg: string;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '#A348',
      title: 'Develop angular project',
      createdBy: 'Dr. Jacob Ryan',
      date: 'Feb 25, 2018',
      priority: 'high',
      completed: true,
      userImg: '/assets/images/user/user1.jpg',
    },
    {
      id: '#A645',
      title: 'File not found exception solve',
      createdBy: 'Dr. Rajesh',
      date: 'Feb 25, 2018',
      priority: 'high',
      completed: false,
      userImg: '/assets/images/user/user2.jpg',
    },
    {
      id: '#A873',
      title: 'Test project and find bug',
      createdBy: 'Dr. Jay Soni',
      date: 'Feb 25, 2018',
      priority: 'low',
      completed: false,
      userImg: '/assets/images/user/user3.jpg',
    },
    {
      id: '#A927',
      title: 'Image not found error',
      createdBy: 'Dr. John Deo',
      date: 'Feb 25, 2018',
      priority: 'normal',
      completed: true,
      userImg: '/assets/images/user/user4.jpg',
    },
    {
      id: '#A228',
      title: 'Solve client error in form',
      createdBy: 'Dr. Megha Trivedi',
      date: 'Feb 25, 2018',
      priority: 'high',
      completed: false,
      userImg: '/assets/images/user/user5.jpg',
    },
  ]);

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const toggleTaskCompletion = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const openTaskDetails = (task: Task) => {
    setSelectedTask(task);
    setIsSidebarOpen(true);
  };

  const getPriorityIcon = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return <MoveUp className="w-4 h-4" />;
      case 'low':
        return <MoveDown className="w-4 h-4" />;
      default:
        return <Minus className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'normal':
        return 'text-blue-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const getPriorityBgColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-50 border-red-200';
      case 'normal':
        return 'bg-blue-50 border-blue-200';
      case 'low':
        return 'bg-green-50 border-green-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="px-6 py-4 bg-white border-b border-gray-200">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span className="font-semibold text-gray-800">Task</span>
          <span className="text-gray-400">›</span>
          <Home size={16} className="text-gray-500" />
          <span className="text-gray-400">›</span>
          <span className="text-gray-600">Task</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-6">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Tasks</h2>
              <p className="text-sm font-medium text-gray-600">15 Total task</p>
            </div>
            <button className="bg-[#faf9fd] hover:bg-blue-700 text-blue-600 py-2 px-4 rounded-full transition-colors">
              Add Task
            </button>
          </div>

          {/* Task List */}
          <div className="overflow-x-auto">
            <div className="min-w-full">
              <div className="space-y-2 p-4">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => openTaskDetails(task)}
                  >
                    {/* Checkbox */}
                    <div className="flex items-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleTaskCompletion(task.id);
                        }}
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                          task.completed
                            ? 'bg-blue-600 border-blue-600 text-white'
                            : 'border-gray-300 hover:border-blue-600'
                        }`}
                      >
                        {task.completed && <Check className="w-3 h-3" />}
                      </button>
                    </div>

                    {/* Task Title */}
                    <div
                      className={`flex-1 text-sm ${
                        task.completed
                          ? 'line-through text-gray-400'
                          : 'text-gray-700'
                      }`}
                    >
                      {task.title}
                    </div>

                    {/* Priority */}
                    <div
                      className={`flex items-center gap-1 px-3 py-1 rounded-full border text-xs font-medium ${getPriorityBgColor(
                        task.priority
                      )} ${getPriorityColor(task.priority)}`}
                    >
                      {getPriorityIcon(task.priority)}
                      <span className="capitalize">{task.priority}</span>
                    </div>

                    {/* User Avatar */}
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs text-white font-medium">
                      {task.createdBy
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>

                    {/* Due Date */}
                    <div className="text-sm text-gray-500">{task.date}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Task Details Sidebar */}
      {isSidebarOpen && selectedTask && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsSidebarOpen(false)}
          ></div>

          <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold">Task Details</h3>
              <div className="flex items-center gap-2">
                <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <Delete className="w-5 h-5" />
                </button>
                <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                  <Save className="w-5 h-5" />
                </button>
                <button
                  className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Form */}
            <div className="p-4 space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  defaultValue={selectedTask.title}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              {/* Completion Status */}
              <div className="flex items-center">
                <button
                  onClick={() => toggleTaskCompletion(selectedTask.id)}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors mr-2 ${
                    selectedTask.completed
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'border-gray-300 hover:border-blue-600'
                  }`}
                >
                  {selectedTask.completed && <Check className="w-3 h-3" />}
                </button>
                <label className="text-sm text-gray-700">
                  Mark as complete
                </label>
              </div>

              {/* Assigned Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assigned Name
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                  <option value="">Select Name</option>
                  <option value="Dr. Jacob Ryan">Dr. Jacob Ryan</option>
                  <option value="Dr. Rajesh">Dr. Rajesh</option>
                  <option value="Dr. Jay Soni">Dr. Jay Soni</option>
                </select>
              </div>

              {/* Priority and Due Date */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                  </label>
                  <select
                    defaultValue={selectedTask.priority}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none capitalize"
                  >
                    <option value="high">High</option>
                    <option value="normal">Normal</option>
                    <option value="low">Low</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Due Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      defaultValue="2018-02-25"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                    <Calendar className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Event Details */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Details
                </label>
                <textarea
                  rows={4}
                  placeholder="Add task details..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Button */}
      <button className="fixed right-6 bottom-6 w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center shadow-lg transition-colors z-40">
        <Settings className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}
