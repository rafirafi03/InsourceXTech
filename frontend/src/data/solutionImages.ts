// Portrait 4:5 artwork for solutions (public/solutionimages, 800x1000 WebP).
// Matched by solution title, ignoring case. Solutions without one keep their original image.
export const SOLUTION_IMAGES: Record<string, string> = {
  "meeting solution": "/solutionimages/meetingsolution.webp",
  "wifi solution": "/solutionimages/wifisolution.webp",
  "telephonic solution": "/solutionimages/telephonicsolution.webp",
  "structure cabling": "/solutionimages/sructurecablingsolution.webp",
  "microsoft software licensing": "/solutionimages/microsoft_software_licensing_solution.webp",
};

export const solutionImage = (title: string): string | undefined =>
  SOLUTION_IMAGES[title.trim().toLowerCase()];
