const oneDayMs = 24 * 60 * 60 * 1000;

export function getAuthCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: oneDayMs
  };
}

export function setAuthCookie(res, token) {
  res.cookie("auth_token", token, getAuthCookieOptions());
}

export function clearAuthCookie(res) {
  res.clearCookie("auth_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax"
  });
}
