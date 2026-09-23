import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import Subscription from "@/models/Subscription";
import webpush from "web-push";
import { requireAdmin } from "@/lib/admin-auth";

// Setup web-push
if (process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY) {
  webpush.setVapidDetails(
    "mailto:admin@gutsnglory.com",
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
  );
}

export async function GET() {
  await requireAdmin();
  await connectDB();
  const blogs = await Blog.find().sort({ createdAt: -1 });
  return NextResponse.json({ blogs });
}

export async function POST(req: Request) {
  await requireAdmin();
  await connectDB();
  const body = await req.json();
  const { title, slug, content, coverImage, tags, sendPush } = body;

  try {
    const blog = await Blog.create({ title, slug, content, coverImage, tags });

    if (sendPush) {
      const subscriptions = await Subscription.find();
      const payload = JSON.stringify({
        title: "New Blog Post!",
        body: title,
        url: `http://blog.localhost:3000/${slug}`,
        icon: coverImage
      });

      // Send pushes asynchronously
      Promise.allSettled(
        subscriptions.map(sub =>
          webpush.sendNotification(
            {
              endpoint: sub.endpoint,
              keys: { p256dh: sub.keys.p256dh, auth: sub.keys.auth }
            },
            payload
          )
        )
      ).catch(console.error);
    }

    return NextResponse.json({ success: true, blog });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
