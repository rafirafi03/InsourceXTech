export const scrollHelper = (section: string)=> {

    document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });

  }