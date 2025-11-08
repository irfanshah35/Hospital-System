import { ChevronRight, Home } from 'lucide-react'
import React from 'react'

export default function DrapDropPage() {

    const starWarsEpisodes = [
        "Episode I - The Phantom Menace",
        "Episode II - Attack of the Clones",
        "Episode III - Revenge of the Sith",
        "Episode IV - A New Hope",
        "Episode V - The Empire Strikes Back",
        "Episode VI - Return of the Jedi",
        "Episode VII - The Force Awakens",
        "Episode VIII - The Last Jedi",
        "Episode IX - The Rise of Skywalker"
    ];

    return (
        <div className="min-h-screen ">
            {/* Breadcrumb */}
            <div className="px-6 py-2 bg-white">
                <div className="flex items-center text-gray-600">
                    <span className="font-semibold text-[20px] text-gray-800">Drag & Drop</span>
                    <ChevronRight className="w-5 h-5 text-gray-400 mx-1" />
                    <Home size={16} className="text-gray-500" />
                    <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
                    <span className="text-gray-600 text-[15px]">Apps</span>
                    <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
                    <span className="text-gray-600 text-[15px]">Drag & Drop</span>
                </div>
            </div>


            <div className='px-6 my-4'>
                <div className="w-full">
                    <div className="bg-white rounded-lg shadow-[0_3px_1px_-2px_#0003,0_2px_2px_#00000024,0_1px_5px_#0000001f]">
                        <div className="py-[10px] px-[15px]">
                            <h2 className="text-[17px] font-semibold">Drag&Drop position locking</h2>
                        </div>
                        <div className="p-4">
                            <div className="flex flex-col md:flex-row gap-6 mb-5">
                                <div
                                    className="p-4 w-[200px] h-[200px] bg-white shadow-[0_3px_1px_-2px_#0003,0_2px_2px_#00000024,0_1px_5px_#0000001f] rounded cursor-move  flex justify-center items-center"
                                >
                                    I can only be dragged up/down
                                </div>

                                <div
                                    className="p-4 w-[200px] h-[200px] bg-white shadow-[0_3px_1px_-2px_#0003,0_2px_2px_#00000024,0_1px_5px_#0000001f] rounded cursor-move flex justify-center items-center"
                                >
                                    I can only be dragged left/right
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



            </div>

            <div className='px-6 my-4'>
                <div className="w-full">
                    <div className="bg-white rounded-lg shadow-[0_3px_1px_-2px_#0003,0_2px_2px_#00000024,0_1px_5px_#0000001f]">
                        <div className="py-[10px] px-[15px]">
                            <h2 className="text-[17px] font-semibold">Drag & Drop boundary</h2>
                        </div>
                        <div className="p-4">
                            <div className="border-2 border-dashed border-gray-300 rounded-lg min-h-[400px] max-w-[400px]">
                                <div
                                    className="p-4 w-[200px] h-[200px] bg-white shadow-[0_3px_1px_-2px_#0003,0_2px_2px_#00000024,0_1px_5px_#0000001f] rounded cursor-move flex justify-center items-center"
                                >
                                    I can only be dragged within the dotted container
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className='px-6 my-4'>
                <div className=" bg-white rounded-lg shadow-[0_3px_1px_-2px_#0003,0_2px_2px_#00000024,0_1px_5px_#0000001f]">
                    <div className="py-[10px] px-[15px]">
                        <h2 className="text-[17px] font-semibold">
                            Drag & Drop Connected Sorting Group
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 max-w-[400px] gap-6 px-6 pb-6">
                        {/* To Do List */}
                        <div className="">
                            <h6 className="text-sm font-semibold text-gray-700 mb-3">To do</h6>
                            <div className="">
                                {["Pick up groceries", "Go home", "Get to work", "Fall asleep"].map((item, index) => (
                                    <div
                                        key={index}
                                        className="cdk-drag bg-white py-5 px-[10px] border border-gray-300 shadow-sm cursor-move hover:shadow-md transition-all"
                                    >
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Done List */}
                        <div className="">
                            <h6 className="text-sm font-semibold text-gray-700 mb-3">Done</h6>
                            <div
                                className=""
                            >
                                {["Get up", "Brush teeth", "Take a shower", "Check e-mail", "Walk dog"].map((item, index) => (
                                    <div
                                        key={index}
                                        className="cdk-drag bg-white py-5 px-[10px] border border-gray-300 cursor-move hover:shadow-md transition-all"
                                    >
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className='px-6 my-4'>
                <div className=" bg-white rounded-lg shadow-[0_3px_1px_-2px_#0003,0_2px_2px_#00000024,0_1px_5px_#0000001f]">
                    <div className="py-[10px] px-[15px]">
                        <h2 className="text-[17px] font-semibold">
                            Drag & Drop Connected Sorting
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 max-w-[400px] gap-6 px-6 pb-6">
                        {/* To Do List */}
                        <div className="">
                            <h6 className="text-sm font-semibold text-gray-700 mb-3">To do</h6>
                            <div className="">
                                {["Pick up groceries", "Go home", "Get to work", "Fall asleep"].map((item, index) => (
                                    <div
                                        key={index}
                                        className="cdk-drag bg-white py-5 px-[10px] border border-gray-300 shadow-sm cursor-move hover:shadow-md transition-all"
                                    >
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Done List */}
                        <div className="">
                            <h6 className="text-sm font-semibold text-gray-700 mb-3">Done</h6>
                            <div
                                className=""
                            >
                                {["Get up", "Brush teeth", "Take a shower", "Check e-mail", "Walk dog"].map((item, index) => (
                                    <div
                                        key={index}
                                        className="cdk-drag bg-white py-5 px-[10px] border border-gray-300 cursor-move hover:shadow-md transition-all"
                                    >
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className='px-6 my-4'>
                <div className=" bg-white rounded-lg shadow-[0_3px_1px_-2px_#0003,0_2px_2px_#00000024,0_1px_5px_#0000001f]">
                    <div className="py-[10px] px-[15px]">
                        <h2 className="text-[17px] font-semibold">
                            Drag & Drop custom placeholder
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 max-w-[400px] gap-6 px-6 pb-6">
                        {/* To Do List */}
                        <div className="">
                            <div className="">
                                {starWarsEpisodes.map((item, index) => (
                                    <div
                                        key={index}
                                        className="cdk-drag bg-white py-5 px-[10px] border border-gray-300 shadow-sm cursor-move hover:shadow-md transition-all"
                                    >
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>


            <div className='px-6 my-4'>
                <div className=" bg-white rounded-lg shadow-[0_3px_1px_-2px_#0003,0_2px_2px_#00000024,0_1px_5px_#0000001f]">
                    <div className="py-[10px] px-[15px]">
                        <h2 className="text-[17px] font-semibold">
                            Drag & Drop Disabled
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 gap-6 px-6 pb-6">
                        {/* To Do List */}
                        <div className="">
                            <div className="">
                                {["i can be draged", "i cannot be draged", "i can also be draged"].map((item, index) => (
                                    <div
                                        key={index}
                                        className="cdk-drag bg-white py-5 px-[10px] border border-gray-300 shadow-sm cursor-move hover:shadow-md transition-all"
                                    >
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>


                    </div>
                </div>

            </div>


            <div className='px-6 my-4'>
                <div className="w-full">
                    <div className="bg-white rounded-lg shadow-[0_3px_1px_-2px_#0003,0_2px_2px_#00000024,0_1px_5px_#0000001f]">
                        <div className="py-[10px] px-[15px]">
                            <h2 className="text-[17px] font-semibold">Drag&Drop with a handle</h2>
                        </div>
                        <div className="p-4">
                            <div className="flex flex-col md:flex-row gap-6 mb-5">
                                <div
                                    className="p-4 w-[200px] h-[200px] bg-white shadow-[0_3px_1px_-2px_#0003,0_2px_2px_#00000024,0_1px_5px_#0000001f] rounded cursor-move  flex justify-center items-center"
                                >
                                    I can only be dragged up/down
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



            </div>

            <div className='px-6 my-4'>
                <div className=" bg-white rounded-lg shadow-[0_3px_1px_-2px_#0003,0_2px_2px_#00000024,0_1px_5px_#0000001f]">
                    <div className="py-[10px] px-[15px]">
                        <h2 className="text-[17px] font-semibold">
                            Drag & Drop enter predicate
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 max-w-[400px] gap-6 px-6 pb-6">
                        {/* To Do List */}
                        <div className="">
                            <h6 className="text-sm font-semibold text-gray-700 mb-3">Available numbers</h6>
                            <div className="">
                                {[1,2,3,4,5,6,7,8,9].map((item, index) => (
                                    <div
                                        key={index}
                                        className="cdk-drag bg-white py-5 px-[10px] border border-gray-300 shadow-sm cursor-move hover:shadow-md transition-all"
                                    >
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Done List */}
                        <div className="">
                            <h6 className="text-sm font-semibold text-gray-700 mb-3">Even numbers</h6>
                            <div
                                className=""
                            >
                                {[10,].map((item, index) => (
                                    <div
                                        key={index}
                                        className="cdk-drag bg-white py-5 px-[10px] border border-gray-300 cursor-move hover:shadow-md transition-all"
                                    >
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>


    )
}
