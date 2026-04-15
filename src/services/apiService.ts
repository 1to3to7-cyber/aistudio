import { LogEntry, UserProfile } from "../types";

const API_BASE = "/api";

export const apiService = {
  async fetchUserProfile(uid: string): Promise<UserProfile> {
    const response = await fetch(`${API_BASE}/users/${uid}`);
    if (!response.ok) throw new Error("Failed to fetch user profile");
    return response.json();
  },

  async updateUserProfile(uid: string, profile: Partial<UserProfile>): Promise<void> {
    const response = await fetch(`${API_BASE}/users/${uid}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });
    if (!response.ok) throw new Error("Failed to update user profile");
  },

  async fetchLogs(uid: string): Promise<LogEntry[]> {
    const response = await fetch(`${API_BASE}/logs/${uid}`);
    if (!response.ok) throw new Error("Failed to fetch logs");
    return response.json();
  },

  async addLogEntry(uid: string, entry: Omit<LogEntry, 'id'>): Promise<{ id: string }> {
    const response = await fetch(`${API_BASE}/logs/${uid}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(entry),
    });
    if (!response.ok) throw new Error("Failed to add log entry");
    return response.json();
  },

  async fetchAdminStats(): Promise<{ totalUsers: number }> {
    const response = await fetch(`${API_BASE}/admin/stats`);
    if (!response.ok) throw new Error("Failed to fetch admin stats");
    return response.json();
  }
};
