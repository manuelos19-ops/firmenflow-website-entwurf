export async function normalizeRequest(request: Request): Promise<{
  data: Record<string, unknown>;
  isFormPost: boolean;
}> {
  const contentType = request.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    const json = await request.json().catch(() => ({}));
    return { data: json, isFormPost: false };
  }

  // Handle URL-encoded or multipart form data
  const formData = await request.formData().catch(() => new FormData());
  const data: Record<string, unknown> = {};

  for (const [key, value] of formData.entries()) {
    if (key === "goals") {
      const allGoals = formData.getAll("goals");
      data.goals = allGoals.map(String);
    } else if (key === "privacyAccepted") {
      data.privacyAccepted = value === "on" || value === "true" || value === "1";
    } else {
      data[key] = String(value);
    }
  }

  // Generate server-side submissionId if missing
  if (!data.submissionId) {
    data.submissionId = crypto.randomUUID();
  }

  return { data, isFormPost: true };
}
