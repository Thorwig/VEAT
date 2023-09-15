export const tags = [
  "Vegan",
  "Halal",
  "Gluten free",
  "Fast food",
  "Pizza",
  "Italian",
  "French",
  "Japanese",
  "Chinese",
  "American",
  "Asian",
  "Snacks",
  "Indian",
  "Moroccan",
  "Thai",
  "Vietnamese",
  "Luxury",
  "Cambodgian",
  "Seafood",
  "Burger",
  "Sushi",
  "Vegetarian",
] as const;

export type Tag = (typeof tags)[number];

export type JWTData = {
  userId: string,
  exp: number
}

export const getJWT = () => {
  const localJWT = localStorage.getItem("JWT");
  let JWT = "";
  if (localJWT) {
    JWT = localJWT
  }

  return `Bearer ${JWT.replaceAll('"', '')}`;
};

export const getUserIdFromJWT = () => {
  const localJWT = localStorage.getItem("JWT");
  let JWTData: JWTData | undefined;
  if (localJWT) {
    const JWT = localJWT
    JWTData = JSON.parse(atob(JWT.split(".")[1]));
    return JWTData?.userId
  }
  return undefined;
}