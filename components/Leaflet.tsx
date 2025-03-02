"use client";

import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Polygon,
  Popup,
  ZoomControl,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import polygonsData from "../data/polygons.json";
import * as turf from "@turf/turf";
import { getRandomColor } from "@/lib/utils";
import { Settings, Map, Users, BarChart2, Globe } from "lucide-react";

const defaultPosition: [number, number] = [37.9838, 23.7275];
const TOTAL_GREEK_POPULATION = 10.64; // Million (data for 2023)

interface PolygonData {
  name?: string;
  coordinates: number[][];
  color?: string;
  population?: string;
}

export default function Leaflet() {
  const [polygons, setPolygons] = useState<
    {
      polygon: L.Polygon;
      name: string;
      area: number;
      population: number;
      color: string;
    }[]
  >([]);
  const [totalPopulation, setTotalPopulation] = useState<number>(0);
  const [density, setDensity] = useState<number>(1);
  const [mapLayer, setMapLayer] = useState<string>("carto-dark");
  const [selectedPolygon, setSelectedPolygon] = useState<number | null>(null);
  const [percentOfGreekPopulation, setPercentOfGreekPopulation] =
    useState<number>(0);

  useEffect(() => {
    const polygonArray = polygonsData.map(
      (polygon: PolygonData, index: number) => {
        const color = polygon.color || getRandomColor(index);
        const leafletPolygon = L.polygon(
          polygon.coordinates as L.LatLngExpression[],
          {
            color,
            fillOpacity: 0.6,
            weight: 2,
          }
        );

        const geojsonPolygon = turf.polygon([polygon.coordinates]);
        const area = turf.area(geojsonPolygon);
        const population = area * density;

        return {
          polygon: leafletPolygon,
          name: polygon.name || `Περιοχή ${index + 1}`,
          area,
          population,
          color,
        };
      }
    );

    const calculatedTotalPopulation = polygonArray.reduce(
      (acc, item) => acc + item.population,
      0
    );
    setPolygons(polygonArray);
    setTotalPopulation(calculatedTotalPopulation);
    setPercentOfGreekPopulation(
      (calculatedTotalPopulation / (TOTAL_GREEK_POPULATION * 1000000)) * 100
    );
  }, [density]);

  const handlePolygonClick = (index: number) => {
    setSelectedPolygon(index);
  };

  // Map layer configurations
  const mapLayers = {
    "carto-dark": {
      url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      attribution: "&copy; CARTO | &copy; OpenStreetMap contributors",
      name: "Σκούρος",
    },
    "carto-light": {
      url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      attribution: "&copy; CARTO | &copy; OpenStreetMap contributors",
      name: "Ανοιχτόχρωμος",
    },
    osm: {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution: "&copy; OpenStreetMap contributors",
      name: "Κλασικός",
    },
    satellite: {
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      attribution: "&copy; Esri | &copy; OpenStreetMap contributors",
      name: "Δορυφορικός",
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 min-h-screen p-4 bg-gradient-to-br from-gray-900 to-red-900 text-white">
      <div className="lg:col-span-3 rounded-xl overflow-hidden shadow-2xl relative h-[70vh] lg:h-[100vh]">
        <MapContainer
          center={defaultPosition}
          zoom={14}
          minZoom={12}
          zoomControl={false}
          className="h-full w-full"
        >
          <TileLayer
            url={mapLayers[mapLayer as keyof typeof mapLayers].url}
            attribution={
              mapLayers[mapLayer as keyof typeof mapLayers].attribution
            }
          />
          <ZoomControl position="bottomright" />

          {polygons.map((item, index) => (
            <Polygon
              key={index}
              positions={item.polygon.getLatLngs()[0] as L.LatLngExpression[]}
              pathOptions={{
                color: item.color,
                fillOpacity: selectedPolygon === index ? 0.8 : 0.5,
                weight: selectedPolygon === index ? 3 : 2,
              }}
              eventHandlers={{
                click: () => handlePolygonClick(index),
              }}
            >
              <Popup className="custom-popup">
                <div className="bg-white text-gray-800 p-3 rounded-lg">
                  <h3 className="font-bold text-lg border-b pb-2 mb-2">
                    {item.name}
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center">
                      <Map className="w-4 h-4 mr-2 text-red-600" />
                      <span>Έκταση:</span>
                    </div>
                    <div className="font-semibold text-right">
                      {(item.area / 1000).toFixed(2)} χιλ. m²
                    </div>

                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2 text-red-600" />
                      <span>Πληθυσμός:</span>
                    </div>
                    <div className="font-semibold text-right">
                      {Math.round(item.population).toLocaleString()}
                    </div>

                    <div className="flex items-center">
                      <BarChart2 className="w-4 h-4 mr-2 text-red-600" />
                      <span>Πυκνότητα:</span>
                    </div>
                    <div className="font-semibold text-right">
                      {density.toFixed(1)} άτομα/m²
                    </div>

                    <div className="flex items-center">
                      <Globe className="w-4 h-4 mr-2 text-red-600" />
                      <span>% Ελλάδας:</span>
                    </div>
                    <div className="font-semibold text-right">
                      {(
                        (item.population / (TOTAL_GREEK_POPULATION * 1000000)) *
                        100
                      ).toFixed(4)}
                      %
                    </div>
                  </div>
                </div>
              </Popup>
            </Polygon>
          ))}
        </MapContainer>
      </div>

      <div className="lg:col-span-2 p-6 bg-gray-800 bg-opacity-80 backdrop-blur-sm rounded-xl shadow-xl flex flex-col gap-6">
        <div className="flex items-center justify-center gap-2">
          <Settings className="w-6 h-6 text-red-400" />
          <h2 className="text-2xl font-bold text-center">Ρυθμίσεις Χάρτη</h2>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-red-300 font-medium">
              Επιλογή επιπέδου χάρτη:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(mapLayers).map(([key, layer]) => (
                <button
                  key={key}
                  onClick={() => setMapLayer(key)}
                  className={`py-2 px-3 rounded-lg transition-all duration-200 ${
                    mapLayer === key
                      ? "bg-red-600 text-white"
                      : "bg-gray-700 hover:bg-gray-600 text-gray-200"
                  }`}
                >
                  {layer.name}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-red-300 font-medium flex justify-between">
              <span>Άνθρωποι ανά τ.μ:</span>
              <span className="text-white font-bold">{density.toFixed(1)}</span>
            </label>
            <input
              type="range"
              min="0.1"
              max="10"
              step="0.1"
              value={density}
              onChange={(e) => setDensity(parseFloat(e.target.value))}
              className="w-full accent-red-500"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>0.1</span>
              <span>5.0</span>
              <span>10.0</span>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-4">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-red-700 to-gray-700 p-6 shadow-lg">
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-purple-400 opacity-20 blur-2xl"></div>
            <h3 className="text-lg font-medium">Συνολική Εκτίμηση</h3>
            <p className="mt-1 text-4xl font-bold">
              {Math.round(totalPopulation).toLocaleString()}
            </p>
            <p className="mt-1 text-sm opacity-75">
              συνολικός πληθυσμός στις επιλεγμένες περιοχές
            </p>
            <div className="mt-1 text-[10px] opacity-75">
              * Η εκτίμηση βασίζεται σε δεδομένα πληθυσμού και ενδέχεται να έχει
              αποκλίσεις. Σε συνθήκες πορείας: - 1 άτομο: Τυπική κίνηση, πιθανό
              στην αρχή ή στο τέλος της πορείας. - 2-3 άτομα: Μικρή συγκέντρωση,
              διάσπαρτες ομάδες ή άτομα που κινούνται περιμετρικά. - 4-5 άτομα:
              Πυκνότερη συγκέντρωση, συνήθως σε βασικά σημεία της πορείας ή
              κοντά σε ηχητικά μέσα. Ο συνολικός πληθυσμός μπορεί να διαφέρει
              ανάλογα με την τοποθεσία, τη διάρκεια και τη δυναμική της
              συγκέντρωσης.
            </div>
          </div>

          {/* New Greek population percentage visualization */}
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-700 to-indigo-800 p-6 shadow-lg">
            <div className="absolute -left-4 -bottom-4 h-24 w-24 rounded-full bg-blue-300 opacity-20 blur-2xl"></div>
            <div className="flex items-center gap-2 mb-2">
              <Globe className="w-5 h-5 text-blue-300" />
              <h3 className="text-lg font-medium">
                Ποσοστό Ελληνικού Πληθυσμού
              </h3>
            </div>

            <div className="relative h-6 bg-gray-700 rounded-full overflow-hidden mt-2">
              <div
                className="absolute h-full bg-gradient-to-r from-blue-500 to-blue-300 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${Math.min(100, percentOfGreekPopulation)}%` }}
              ></div>
            </div>

            <div className="flex justify-between mt-1">
              <p className="text-sm opacity-75">0%</p>
              <p className="font-bold text-xl text-center my-2 text-blue-200">
                {percentOfGreekPopulation.toFixed(4)}%
              </p>
              <p className="text-sm opacity-75">100%</p>
            </div>

            <p className="mt-1 text-sm opacity-75 text-center">
              του συνολικού πληθυσμού της Ελλάδας ({TOTAL_GREEK_POPULATION}{" "}
              εκατομμύρια)
            </p>
          </div>
        </div>

        {selectedPolygon !== null && (
          <div className="p-4 bg-red-900 bg-opacity-50 rounded-lg shadow-inner">
            <h3 className="font-bold text-lg text-red-300 mb-2">
              {polygons[selectedPolygon].name}
            </h3>
            <div className="flex justify-between py-1">
              <span>Έκταση:</span>
              <span className="font-semibold">
                {(polygons[selectedPolygon].area / 1000).toFixed(2)} χιλ. m²
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span>Πληθυσμός:</span>
              <span className="font-semibold">
                {Math.round(
                  polygons[selectedPolygon].population
                ).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span>Ποσοστό συνόλου:</span>
              <span className="font-semibold">
                {(
                  (polygons[selectedPolygon].population / totalPopulation) *
                  100
                ).toFixed(1)}
                %
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span>Ποσοστό Ελλάδας:</span>
              <span className="font-semibold">
                {(
                  (polygons[selectedPolygon].population /
                    (TOTAL_GREEK_POPULATION * 1000000)) *
                  100
                ).toFixed(4)}
                %
              </span>
            </div>
          </div>
        )}

        <div className="bg-gray-700 p-4 rounded-lg text-sm mt-auto">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <Map className="w-4 h-4 text-red-400" />
            Οδηγίες Χρήσης
          </h3>
          <ul className="list-disc pl-5 mt-2 space-y-2 text-gray-300">
            <li>
              Επιλέξτε έναν από τους τέσσερις τύπους χάρτη που ταιριάζει στις
              ανάγκες σας.
            </li>
            <li>Ρυθμίστε την πυκνότητα πληθυσμού χρησιμοποιώντας το slider.</li>
            <li>
              Κάντε κλικ σε οποιαδήποτε περιοχή για να δείτε αναλυτικές
              πληροφορίες.
            </li>
            <li>
              Χρησιμοποιήστε τα κουμπιά zoom στην κάτω δεξιά γωνία του χάρτη.
            </li>
            <li>
              Παρακολουθήστε το ποσοστό του συνολικού ελληνικού πληθυσμού που
              κατα εκτίμηση συμμετείχε
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
