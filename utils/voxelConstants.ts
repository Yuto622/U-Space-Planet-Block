/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export const COLORS = {
  // Planets
  SUN_CORE: 0xFF0000,    // Red
  SUN_SURFACE: 0xFF0000, // Red
  SUN_FLARE: 0xCC0000,   // Dark Red variation
  
  EARTH_OCEAN: 0x1E90FF, // Dodger Blue
  EARTH_LAND: 0x228B22,  // Forest Green
  EARTH_CLOUD: 0xFFFFFF, // White
  
  MARS_RUST: 0xFF0000,   // Red
  MARS_ROCK: 0x8B0000,   // Dark Red
  
  SATURN_BODY: 0x8B4513, // Saddle Brown
  SATURN_BAND: 0x5C4033, // Dark Brown
  SATURN_RING_A: 0xA0522D, // Sienna (Brown)
  SATURN_RING_B: 0x654321, // Dark Brown
  
  SPACE_ROCK: 0x696969,  // DimGray

  // Fallbacks / Legacy
  WHITE: 0xFFFFFF,
  BLACK: 0x111111,
  DARK: 0x2A2A2A,
  LIGHT: 0xCCCCCC,
  GREEN: 0x228B22,
  WOOD: 0x8B4513,
};

export const CONFIG = {
  VOXEL_SIZE: 1,
  FLOOR_Y: -20,
  BG_COLOR: 0x0B0F19, // Deep space dark blue/black
};