"use client";
import { useState, useEffect } from "react";
import { CheckCircle2, BellRing } from "lucide-react";

export default function SubscribeButton() {
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      navigator.serviceWorker.register("/sw.js").then((reg) => {
        reg.pushManager.getSubscription().then((sub) => {
          if (sub) setSubscribed(true);
        });
      });
    }
  }, []);

  const handleSubscribe = async () => {
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      alert("Push notifications are not supported by your browser.");
      return;
    }

    setLoading(true);
    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        alert("You denied notification permissions.");
        setLoading(false);
        return;
      }

      const reg = await navigator.serviceWorker.ready;
      
      const res = await fetch("/api/web-push/vapid-key");
      // Actually we have the public key in env, but since this is client component, we should pass it or use NEXT_PUBLIC
      const publicVapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
      if (!publicVapidKey) throw new Error("Missing VAPID Key");

      const subscription = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: publicVapidKey
      });

      await fetch("/api/web-push/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(subscription)
      });

      setSubscribed(true);
      alert("Subscribed to notifications!");
    } catch (e) {
      console.error(e);
      alert("Failed to subscribe");
    } finally {
      setLoading(false);
    }
  };

  if (subscribed) {
    return (
      <button className="px-5 py-2.5 rounded-full text-sm font-semibold bg-edge text-muted flex items-center gap-2 cursor-default">
        <CheckCircle2 size={16}/> Subscribed
      </button>
    );
  }

  return (
    <button 
      onClick={handleSubscribe} 
      disabled={loading}
      className="px-5 py-2.5 rounded-full text-sm font-semibold bg-gold text-[#1A1A1A] hover:bg-[#D4B85E] transition-colors flex items-center gap-2"
    >
      {loading ? "..." : <span className="flex items-center gap-2"><BellRing size={16}/> Notify Me</span>}
    </button>
  );
}
