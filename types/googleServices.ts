
interface LatLngLiteral {
    lat: number
    lng: number
}

interface IBounds {
    northeast: LatLngLiteral
    southwest: LatLngLiteral
}

// Directions API interfaces

interface directionsGeocodedWaypoint {
    geocoder_status?: string
    partial_match?: any
    place_id?: string
    types?: [string]
}

// String representing all points of polyline
interface directionsPolyline {
    points: string
}

interface directionsSteps {
    duration: {text: string, value: number}
    end_location: LatLngLiteral
    html_instructions: string
    polyline: directionsPolyline
    start_location: LatLngLiteral
    travel_mode: string
    distance?: {text: string, value: number}
    maneuver?: string
}

interface directionsLegs {
    end_address: string
    end_location: LatLngLiteral
    start_address: string
    start_location: LatLngLiteral
    steps: directionsSteps[]
}

interface directionsRoute {
    bounds: IBounds
    copyrights: string
    legs: directionsLegs[]
    overview_polyline: directionsPolyline
    summary: string
    warnings: [string]
    waypoint_order: [number]

}

export interface directionsApiResponse {
    geocoded_waypoints?: directionsGeocodedWaypoint[]
    routes: directionsRoute[]
    status: string
    available_travel_modes?: string
    error_message?: string
}

// Geocode API interfaces

interface geocodeAddressComponent {
    types: [string]
    long_name: string
    short_name: string
}

interface geocodeGeometry {
    location: LatLngLiteral
    location_type: string
    viewport: {northeast: LatLngLiteral, southwest: LatLngLiteral}
    bounds?: IBounds
}

interface geocodeResult {
    types: [string]
    formatted_address: string
    address_components?: geocodeAddressComponent[]
    postcode_localities?: [string]
    geometry: [geocodeGeometry]
    plus_code: {global_code: string, compound_code: string}
    place_id: string
}

export interface geocodeApiResponse {
    results: [geocodeResult]
    status: string
}

// Places autocomplete API interfaces

interface placesAutocompletesMatchedSubstring {
    length: number
    offset: number
}

interface placesAutocompletesStructuredFormat {
    main_text: string
    main_text_matched_substrings: placesAutocompletesMatchedSubstring[]
    secondary_text: string
}

export interface placesAutocompletesPrediction {
    description: string
    matched_substrings: placesAutocompletesMatchedSubstring[]
    structured_formatting: placesAutocompletesStructuredFormat[]
    terms: [{offset: number, value: string}]

}

export interface placesAutocompletesApiResponse {
    predictions: placesAutocompletesPrediction[]
    status: string
    error_message?: string
    info_message?: string
}