import { NextResponse } from "next/server";
import TaskModel from "@/app/models/taskModel";
import connect from "@/app/lib/db";
import { NextRequest } from 'next/server';

export async function POST(request: Request) {
  try {
    await connect();

    const { title, description, category, status, selected, clerkUserId } = await request.json();
    const dueDate = new Date();

    const newTask = await TaskModel.create({
      title,
      description,
      category,
      status: status || "todo", 
      selected: selected || false, 
      clerkUserId,
      dueDate,
    });

    return NextResponse.json(
      {
        message: "Task created successfully",
        task: newTask,
      },
      { status: 201 }  
    );
    
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    await connect();

    const { id, title, description, category, status, selected, clerkUserId, dueDate } =
    await request.json();
  
    const updatedTask = await TaskModel.findByIdAndUpdate(
      id,
      {
        title,
        description,
        category,
        status,
        selected,
        clerkUserId,
        dueDate,
      },
      { new: true }
    );

    console.log("Received Task ID:", id);
    console.log("Updated Task Data:", {
      title,
      description,
      category,
      status,
      selected,
      clerkUserId,
      dueDate,
    });

    if (!updatedTask) {
      return NextResponse.json(
        { message: "Task not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Task updated successfully",
        task: updatedTask,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await connect();

    const id = request.nextUrl.searchParams.get("id");
    console.log("Received Task ID to Delete:", id);

    if (!id || id === "undefined") {
      return NextResponse.json(
        { message: "Task ID is required" },
        { status: 400 }
      );
    }

    const deletedTask = await TaskModel.findByIdAndDelete(id);

    if (!deletedTask) {
      return NextResponse.json(
        { message: "Task not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Task deleted successfully",
        task: deletedTask,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting task:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await connect();
    const clerkUserId = request.nextUrl.searchParams.get("clerkUserId");
    const tasks = await TaskModel.find({ clerkUserId });

    return NextResponse.json({ tasks }); 
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}