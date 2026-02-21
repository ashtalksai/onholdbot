import type { Call, CallStatus, IVRStep } from "@/types";

// In-memory store for MVP (replace with database later)
const calls = new Map<string, Call>();

export function createCall(data: Omit<Call, "id" | "startedAt" | "ivrPath" | "status">): Call {
  const call: Call = {
    id: `call-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    status: "initiating",
    ivrPath: [],
    startedAt: new Date(),
    ...data,
  };
  calls.set(call.id, call);
  return call;
}

export function getCall(id: string): Call | undefined {
  return calls.get(id);
}

export function updateCallStatus(id: string, status: CallStatus, extra?: Partial<Call>): Call | undefined {
  const call = calls.get(id);
  if (!call) return undefined;

  call.status = status;
  if (extra) {
    Object.assign(call, extra);
  }
  
  if (status === "human" && !call.humanDetectedAt) {
    call.humanDetectedAt = new Date();
  }
  
  if (status === "ended" && !call.endedAt) {
    call.endedAt = new Date();
    if (call.humanDetectedAt) {
      call.holdDuration = Math.floor(
        (call.humanDetectedAt.getTime() - call.startedAt.getTime()) / 1000
      );
    }
  }

  return call;
}

export function addIVRStep(id: string, step: IVRStep): Call | undefined {
  const call = calls.get(id);
  if (!call) return undefined;
  call.ivrPath.push(step);
  return call;
}

export function getUserCalls(userId: string): Call[] {
  return Array.from(calls.values())
    .filter((call) => call.userId === userId)
    .sort((a, b) => b.startedAt.getTime() - a.startedAt.getTime());
}

// Conference name to call ID mapping
const conferenceMap = new Map<string, string>();

export function setConferenceCallId(conferenceName: string, callId: string): void {
  conferenceMap.set(conferenceName, callId);
}

export function getCallIdByConference(conferenceName: string): string | undefined {
  return conferenceMap.get(conferenceName);
}
