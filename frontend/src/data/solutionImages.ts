// Portrait 4:5 artwork for solutions (public/solutionimages, 800x1000 WebP).
// Matched by solution title, ignoring case. Solutions without one keep their original image.
export const SOLUTION_IMAGES: Record<string, string> = {
  "meeting solution": "/solutionimages/meetingsolution.webp",
  "wifi solution": "/solutionimages/wifisolution.webp",
  "telephonic solution": "/solutionimages/telephonicsolution.webp",
  "structure cabling": "/solutionimages/sructurecablingsolution.webp",
  "microsoft software licensing": "/solutionimages/microsoft_software_licensing_solution.webp",
  "audio visual products": "/solutionimages/audio_visual_products.webp",
  "cctv solutions": "/solutionimages/cctv_solutions.webp",
  "time attendance & access control system solution":
    "/solutionimages/time_attendance_and_access_control_system_solution.webp",
  "intercom solution": "/solutionimages/intercom_solution.webp",
  "anpr solution": "/solutionimages/anpr_solution.webp",
  "turnstile and speed gates solution": "/solutionimages/turnstile_and_speed_gate_solution.webp",
  "automatic gate barrier solution": "/solutionimages/automatic_gate_barrier_solution.webp",
};

export const solutionImage = (title: string): string | undefined =>
  SOLUTION_IMAGES[title.trim().toLowerCase()];
