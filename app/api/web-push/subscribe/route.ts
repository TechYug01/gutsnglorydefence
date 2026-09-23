import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Subscription from "@/models/Subscription";

export async function POST(req: Request) {
  try {
    await connectDB();
    const subscription = await req.json();

    if (!subscription.endpoint || !subscription.keys) {
      return NextResponse.json({ error: "Invalid subscription payload" }, { status: 400 });
    }

    // Save or update subscription
    await Subscription.findOneAndUpdate(
      { endpoint: subscription.endpoint },
      { keys: subscription.keys },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
