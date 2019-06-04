import { Point } from 'geojson';

class MockLocation {
  constructor(public point: Point, public address: string) {}
}

export const mockLocations: MockLocation[] = [];

mockLocations.push(
  new MockLocation(
    { type: 'Point', coordinates: [150.9028291, -34.4038168] },
    'Fairy Meadow Beach, New South Wales, Australia',
  ),
);

mockLocations.push(
  new MockLocation(
    { type: 'Point', coordinates: [150.8856751, -34.4124334] },
    '6 Foley Street, Gwynneville NSW, Australia',
  ),
);

mockLocations.push(
  new MockLocation(
    { type: 'Point', coordinates: [150.892532, -34.424825] },
    'Humber, Crown Street, Wollongong NSW, Australia',
  ),
);

mockLocations.push(
  new MockLocation(
    { type: 'Point', coordinates: [150.8856257, -34.4109917] },
    'TAFE Illawarra, University Ave, North Wollongong NSW, Australia',
  ),
);

mockLocations.push(
  new MockLocation(
    { type: 'Point', coordinates: [150.9003133, -34.4145155] },
    'Novotel Wollongong Northbeach, Cliff Road, North Wollongong NSW, Australia',
  ),
);

mockLocations.push(
  new MockLocation(
    { type: 'Point', coordinates: [150.8994487, -34.4029465] },
    'Innovation Campus - University Of Wollongong, Squires Way, North Wollongong NSW, Australia',
  ),
);

mockLocations.push(
  new MockLocation(
    { type: 'Point', coordinates: [150.8917412, -34.4236253] },
    '77 Market Street, Wollongong NSW, Australia',
  ),
);
