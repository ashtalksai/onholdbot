import { NextRequest, NextResponse } from "next/server";
import { getCall } from "@/lib/calls";
import type { CallStatusEvent, UserCallState, BotState, CompanyState } from "@/types";

// GET /api/calls/[id]/stream - SSE endpoint for real-time call updates
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const encoder = new TextEncoder();
  let intervalId: ReturnType<typeof setInterval>;

  const stream = new ReadableStream({
    start(controller) {
      // Send initial state
      const sendEvent = () => {
        const call = getCall(id);

        if (!call) {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ error: "Call not found" })}\n\n`)
          );
          controller.close();
          clearInterval(intervalId);
          return;
        }

        // Derive states from call status
        let userState: UserCallState = "muted";
        let botState: BotState = "active";
        let companyState: CompanyState = "ringing";

        switch (call.status) {
          case "initiating":
            companyState = "ringing";
            break;
          case "navigating":
          case "holding":
            companyState = "hold";
            break;
          case "human":
          case "live":
            userState = "live";
            companyState = "human";
            botState = "idle";
            break;
          case "ended":
          case "failed":
            botState = "idle";
            break;
        }

        const event: CallStatusEvent = {
          status: call.status,
          userState,
          botState,
          companyState,
          elapsedSeconds: Math.floor((Date.now() - call.startedAt.getTime()) / 1000),
          ivrPath: call.ivrPath,
          audioLevel: Math.random() * 0.3 + 0.1, // Simulated audio level
        };

        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify(event)}\n\n`)
        );

        // Close stream if call ended
        if (call.status === "ended" || call.status === "failed") {
          clearInterval(intervalId);
          controller.close();
        }
      };

      // Send updates every second
      sendEvent();
      intervalId = setInterval(sendEvent, 1000);
    },
    cancel() {
      clearInterval(intervalId);
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
