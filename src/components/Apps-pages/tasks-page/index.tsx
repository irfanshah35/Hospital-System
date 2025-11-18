"use client";
import { useState, useEffect } from "react";
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
  GripVertical,
  ChevronRight,
  X,
} from "lucide-react";

// ✅ Define Task interface
interface Task {
  id: string;
  title: string;
  createdBy: string;
  date: string;
  priority: "high" | "normal" | "low";
  completed: boolean;
  userImg: string;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "#A348",
      title: "Develop angular project",
      createdBy: "Dr. Jacob Ryan",
      date: "Feb 25, 2018",
      priority: "high",
      completed: true,
      userImg: "/assets/patient-1.jpg",
    },
    {
      id: "#A645",
      title: "File not found exception solve",
      createdBy: "Dr. Rajesh",
      date: "Feb 25, 2018",
      priority: "high",
      completed: false,
      userImg: "/assets/patient-1.jpg",
    },
    {
      id: "#A873",
      title: "Test project and find bug",
      createdBy: "Dr. Jay Soni",
      date: "Feb 25, 2018",
      priority: "low",
      completed: false,
      userImg: "/assets/patient-1.jpg",
    },
    {
      id: "#A927",
      title: "Image not found error",
      createdBy: "Dr. John Deo",
      date: "Feb 25, 2018",
      priority: "normal",
      completed: true,
      userImg: "/assets/patient-1.jpg",
    },
    {
      id: "#A228",
      title: "Solve client error in form",
      createdBy: "Dr. Megha Trivedi",
      date: "Feb 25, 2018",
      priority: "high",
      completed: false,
      userImg: "/assets/patient-1.jpg",
    },
  ]);

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Floating input form data
  const [formData, setFormData] = useState({
    title: "",
    assignedName: "",
    priority: "",
    dueDate: "",
    details: "",
    markComplete: false,
  });

  const [focusedFields, setFocusedFields] = useState<Record<string, boolean>>({});

  // ✅ Update formData whenever sidebar opens with selectedTask
  useEffect(() => {
    if (selectedTask) {
      setFormData({
        title: selectedTask.title,
        assignedName: selectedTask.createdBy,
        priority: selectedTask.priority,
        dueDate: selectedTask.date,
        details: "",
        markComplete: selectedTask.completed,
      });
    }
  }, [selectedTask]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const handleFocus = (field: string) => {
    setFocusedFields((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field: string) => {
    setFocusedFields((prev) => ({ ...prev, [field]: false }));
  };

  const shouldLabelFloat = (field: string) =>
    focusedFields[field] || formData[field as keyof typeof formData] !== "";

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

  const openAddModal = () => {
    setFormData({
      title: "",
      assignedName: "",
      priority: "",
      dueDate: "",
      details: "",
      markComplete: false,
    });
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    // Add new task logic here
    const newTask: Task = {
      id: `#A${Math.floor(Math.random() * 1000)}`,
      title: formData.title,
      createdBy: formData.assignedName,
      date: formData.dueDate,
      priority: formData.priority as "high" | "normal" | "low",
      completed: formData.markComplete,
      userImg: "/assets/patient-1.jpg",
    };

    setTasks(prev => [...prev, newTask]);
    setIsAddModalOpen(false);
    alert("Task added successfully!");
  };

  const getPriorityIcon = (priority: Task["priority"]) => {
    switch (priority) {
      case "high":
        return <MoveUp className="w-5 h-5" />;
      case "low":
        return <MoveDown className="w-5 h-5" />;
      default:
        return <Minus className="w-5 h-5" />;
    }
  };

  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "high":
        return "text-red-600";
      case "normal":
        return "text-[#868688]";
      case "low":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="min-h-screen ">
      {/* Breadcrumb */}
      <div className="px-6 py-2 bg-white">
        <div className="flex items-center text-gray-600">
          <span className="font-semibold text-[20px] text-gray-800">Task</span>
          <ChevronRight className="w-5 h-5 text-gray-400 mx-1" />
          <Home size={16} className="text-gray-500" />
          <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
          <span className="text-gray-600 text-[15px]">Task</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-4">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Header */}
          <div className="p-4 flex justify-between items-center">
            <div>
              <h2 className="text-gray-800 mb-2 text-lg font-semibold">
                Tasks
              </h2>
              <p className="text-sm font-medium text-gray-600">
                {tasks.length} Total tasks
              </p>
            </div>
            <button
              onClick={openAddModal}
              className="bg-[#faf9fd] shadow-md hover:bg-[#E6ECF8] cursor-pointer text-blue-600 py-3 px-6 rounded-full transition-colors text-sm font-semibold"
            >
              Add Task
            </button>
          </div>

          {/* Task List */}
          <div className="overflow-x-auto">
            <div className="min-w-full space-y-2 p-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => openTaskDetails(task)}
                >
                  <GripVertical className="w-5 h-5 text-gray-400" />

                  {/* Checkbox */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTaskCompletion(task.id);
                    }}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${task.completed
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "border-gray-300 hover:border-blue-600"
                      }`}
                  >
                    {task.completed && <Check className="w-3 h-3" />}
                  </button>

                  {/* Title */}
                  <div
                    className={`flex-1 text-sm ${task.completed
                      ? "line-through text-gray-400"
                      : "text-gray-700"
                      }`}
                  >
                    {task.title}
                  </div>

                  {/* Priority */}
                  <div
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(
                      task.priority
                    )}`}
                  >
                    {getPriorityIcon(task.priority)}
                    <span className="capitalize">{task.priority}</span>
                  </div>

                  {/* Avatar */}
                  <img
                    className="w-8 h-8 rounded-full"
                    src={task.userImg}
                    alt=""
                  />

                  {/* Date */}
                  <div className="text-sm text-gray-500">{task.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Task Sidebar */}
      {isSidebarOpen && selectedTask && (
        <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50 bg-opacity-40"
            onClick={() => setIsSidebarOpen(false)}
          ></div>

          <div className="absolute max-h-[65vh] w-[60vw] rounded-[8px] bg-white shadow-xl overflow-y-auto scrollbar-hide">
            {/* Header */}
            <div className="flex items-center justify-between py-2 px-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold">Task Details</h3>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-red-50 rounded-lg transition-colors cursor-pointer">
                  <Trash2 className="w-5 h-5 text-red-500" />
                </button>
                <button className="p-2 hover:bg-green-50 rounded-lg transition-colors cursor-pointer">
                  <Save className="w-5 h-5 text-green-500" />
                </button>
                <button
                  className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Form */}
            <div className="p-4 space-y-6">
              {/* Title */}
              <FloatingInput
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                shouldLabelFloat={shouldLabelFloat}
              />

              {/* Mark as Complete Checkbox */}
              <div className="flex items-center gap-3 mb-3">
                <input
                  type="checkbox"
                  id="markComplete"
                  name="markComplete"
                  checked={formData.markComplete}
                  onChange={handleCheckboxChange}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="markComplete" className="text-sm text-gray-700">
                  Mark as complete
                </label>
              </div>

              {/* Assigned Name */}
              <FloatingSelect
                label="Assigned Name"
                name="assignedName"
                value={formData.assignedName}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                shouldLabelFloat={shouldLabelFloat}
                options={[
                  "Dr. Jacob Ryan",
                  "Dr. Rajesh",
                  "Dr. Jay Soni",
                  "Dr. Megha Trivedi",
                ]}
              />

              {/* Priority */}
              <FloatingSelect
                label="Priority"
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                shouldLabelFloat={shouldLabelFloat}
                options={["high", "normal", "low"]}
              />

              {/* Due Date */}
              <FloatingInput
                label="Due Date"
                name="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                shouldLabelFloat={shouldLabelFloat}
              />

              {/* Details */}
              <FloatingTextarea
                label="Event Details"
                name="details"
                value={formData.details}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                shouldLabelFloat={shouldLabelFloat}
              />
            </div>
          </div>
        </div>
      )}

      {/* Add Task Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50 bg-opacity-40 "
            onClick={closeAddModal}
          ></div>

          <div className="absolute max-h-[65vh] w-[60vw] rounded-[8px] bg-white shadow-xl overflow-y-auto scrollbar-hide">
            {/* Header */}
            <div className="flex items-center justify-between py-2 px-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold">New Task</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleAddTask}
                  className="p-2 hover:bg-green-50 rounded-lg transition-colors cursor-pointer"
                  title="Save Task"
                >
                  <Save className="w-5 h-5 text-green-500" />
                </button>
                <button
                  className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                  onClick={closeAddModal}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleAddTask} className="p-4 space-y-6">
              {/* Title with Icon */}
              <div className="relative">
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus("title")}
                  onBlur={() => handleBlur("title")}
                  className="peer w-full px-4 pt-6 pb-2 pr-12 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all placeholder-transparent"
                  placeholder="Title"
                />
                <label
                  htmlFor="title"
                  className={`absolute left-4 bg-white px-1 transition-all duration-200 ${shouldLabelFloat("title")
                    ? "-top-2 text-xs text-blue-600"
                    : "top-4 text-base text-gray-600"
                    }`}
                >
                  Title
                </label>
              </div>

              {/* Mark as Complete Checkbox */}
              <div className="flex items-center gap-3 mb-3">
                <input
                  type="checkbox"
                  id="markComplete"
                  name="markComplete"
                  checked={formData.markComplete}
                  onChange={handleCheckboxChange}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="markComplete" className="text-sm text-gray-700">
                  Mark as complete
                </label>
              </div>

              {/* Assigned Name */}
              <FloatingSelect
                label="Assigned Name"
                name="assignedName"
                value={formData.assignedName}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                shouldLabelFloat={shouldLabelFloat}
                options={[
                  "Dr. Jacob Ryan",
                  "Dr. Rajesh",
                  "Dr. Jay Soni",
                  "Dr. John Deo",
                  "Dr. Megha Trivedi",
                ]}
              />

              {/* Priority and Due Date in Row */}
              <div className="grid grid-cols-2 gap-4">
                {/* Priority */}
                <FloatingSelect
                  label="Priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  shouldLabelFloat={shouldLabelFloat}
                  options={["high", "normal", "low"]}
                />

                {/* Due Date with Calendar Icon */}
                <div className="relative">
                  <input
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    required
                    value={formData.dueDate}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus("dueDate")}
                    onBlur={() => handleBlur("dueDate")}
                    className="peer w-full px-4 py-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all placeholder-transparent"
                    placeholder="Due date"
                  />
                  <label
                    htmlFor="dueDate"
                    className={`absolute left-4 bg-white px-1 transition-all duration-200 ${shouldLabelFloat("dueDate")
                      ? "-top-2 text-xs text-blue-600"
                      : "top-4 text-base text-gray-600"
                      }`}
                  >
                    Due date
                  </label>
                </div>
              </div>

              {/* Event Details */}
              <FloatingTextarea
                label="Event Details"
                name="details"
                value={formData.details}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                shouldLabelFloat={shouldLabelFloat}
              />

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Save Task
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/* ✅ Reusable Floating Input Components */

function FloatingInput({ label, name, value, onChange, onFocus, onBlur, shouldLabelFloat, type = "text" }: any) {
  return (
    <div className="relative">
      <input
        type={type}
        id={name}
        name={name}
        required
        value={value}
        onChange={onChange}
        onFocus={() => onFocus(name)}
        onBlur={() => onBlur(name)}
        className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all placeholder-transparent"
        placeholder={label}
      />
      <label
        htmlFor={name}
        className={`absolute left-4 bg-white px-1 transition-all duration-200 ${shouldLabelFloat(name)
          ? "-top-2 text-xs text-blue-600"
          : "top-4 text-base text-gray-600"
          }`}
      >
        {label}
      </label>
    </div>
  );
}

function FloatingSelect({ label, name, value, onChange, onFocus, onBlur, shouldLabelFloat, options }: any) {
  return (
    <div className="relative">
      <select
        id={name}
        name={name}
        required
        value={value}
        onChange={onChange}
        onFocus={() => onFocus(name)}
        onBlur={() => onBlur(name)}
        className="peer w-full px-4 pt-6 pb-2 pr-10 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all bg-transparent capitalize appearance-none"
      >
        <option hidden></option>
        {options.map((opt: string) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>

      {/* Label */}
      <label
        htmlFor={name}
        className={`absolute left-4 bg-white px-1 transition-all duration-200 ${shouldLabelFloat(name)
          ? "-top-2 text-xs text-blue-600"
          : "top-4 text-base text-gray-600"
          }`}
      >
        {label}
      </label>

      {/* Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute right-4 top-4 w-5 h-5 text-gray-400 pointer-events-none"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
}

function FloatingTextarea({ label, name, value, onChange, onFocus, onBlur, shouldLabelFloat }: any) {
  return (
    <div className="relative">
      <textarea
        id={name}
        name={name}
        required
        rows={4}
        value={value}
        onChange={onChange}
        onFocus={() => onFocus(name)}
        onBlur={() => onBlur(name)}
        className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all resize-none placeholder-transparent"
        placeholder={label}
      ></textarea>
      <label
        htmlFor={name}
        className={`absolute left-4 bg-white px-1 transition-all duration-200 ${shouldLabelFloat(name)
          ? "-top-2 text-xs text-blue-600"
          : "top-4 text-base text-gray-600"
          }`}
      >
        {label}
      </label>
    </div>
  );
}