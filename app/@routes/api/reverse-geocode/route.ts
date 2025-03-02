import { NextResponse } from "next/server";
import polygonsData from "@/data/polygons.json"; // Βεβαιώσου ότι η διαδρομή είναι σωστή

interface PolygonData {
  name?: string;
  coordinates: number[][];
  color?: string;
  population?: string;
}

interface CityData {
  name: string;
  lat: number;
  lon: number;
}

export async function GET() {
  try {
    const cities: CityData[] = [];

    for (const polygon of polygonsData as PolygonData[]) {
      const [lat, lon] = polygon.coordinates[0];

      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse.php?lat=${lat}&lon=${lon}&zoom=18&format=jsonv2`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch city data: ${response.statusText}`);
      }

      const data = await response.json();
      const cityName = data.address?.municipality;

      if (cityName && !cities.some((city) => city.name === cityName)) {
        cities.push({ name: cityName, lat, lon });
      }
    }

    return NextResponse.json(cities);
  } catch (error) {
    console.error("Error fetching cities:", error);
    return NextResponse.json(
      { error: "Failed to fetch cities" },
      { status: 500 }
    );
  }
}
