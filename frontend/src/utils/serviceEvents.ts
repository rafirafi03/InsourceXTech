// Lets other parts of the page (e.g. the hero) ask the Services section to
// open a specific service's details window.
export const OPEN_SERVICE_EVENT = "insource:open-service";

export const openService = (serviceId: string) =>
  window.dispatchEvent(new CustomEvent<string>(OPEN_SERVICE_EVENT, { detail: serviceId }));
