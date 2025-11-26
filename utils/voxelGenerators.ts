/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { VoxelData } from '../types';
import { COLORS } from './voxelConstants';

// Helper to prevent overlapping voxels
function setBlock(map: Map<string, VoxelData>, x: number, y: number, z: number, color: number) {
    const rx = Math.round(x);
    const ry = Math.round(y);
    const rz = Math.round(z);
    const key = `${rx},${ry},${rz}`;
    map.set(key, { x: rx, y: ry, z: rz, color });
}

function generateSphere(map: Map<string, VoxelData>, cx: number, cy: number, cz: number, r: number, col: number) {
    const r2 = r * r;
    const xMin = Math.floor(cx - r);
    const xMax = Math.ceil(cx + r);
    const yMin = Math.floor(cy - r);
    const yMax = Math.ceil(cy + r);
    const zMin = Math.floor(cz - r);
    const zMax = Math.ceil(cz + r);

    for (let x = xMin; x <= xMax; x++) {
        for (let y = yMin; y <= yMax; y++) {
            for (let z = zMin; z <= zMax; z++) {
                const dx = x - cx;
                const dy = y - cy;
                const dz = z - cz;
                if (dx * dx + dy * dy + dz * dz <= r2) {
                    setBlock(map, x, y, z, col);
                }
            }
        }
    }
}

export const Generators = {
    Earth: (): VoxelData[] => {
        const map = new Map<string, VoxelData>();
        const R = 9;
        
        for (let x = -R; x <= R; x++) {
            for (let y = -R; y <= R; y++) {
                for (let z = -R; z <= R; z++) {
                    const dist = Math.sqrt(x*x + y*y + z*z);
                    if (dist <= R) {
                        let color = COLORS.EARTH_OCEAN;
                        
                        // Simple noise simulation for continents using sine waves
                        const noise = Math.sin(x * 0.4) + Math.sin(y * 0.4) + Math.sin(z * 0.4);
                        if (noise > 0.5) color = COLORS.EARTH_LAND;
                        
                        // Ice caps
                        if (Math.abs(y) > R * 0.85) color = COLORS.EARTH_CLOUD;
                        
                        // Random clouds
                        if (dist > R - 1.5 && Math.random() > 0.9 && Math.abs(y) < R * 0.7) {
                             color = COLORS.EARTH_CLOUD;
                        }

                        setBlock(map, x, y, z, color);
                    }
                }
            }
        }
        return Array.from(map.values());
    },

    Mars: (): VoxelData[] => {
        const map = new Map<string, VoxelData>();
        const R = 7;
        
        for (let x = -R; x <= R; x++) {
            for (let y = -R; y <= R; y++) {
                for (let z = -R; z <= R; z++) {
                    if (Math.sqrt(x*x + y*y + z*z) <= R) {
                        let color = COLORS.MARS_RUST;
                        if (Math.random() > 0.75) color = COLORS.MARS_ROCK;
                        setBlock(map, x, y, z, color);
                    }
                }
            }
        }
        return Array.from(map.values());
    },

    Saturn: (): VoxelData[] => {
        const map = new Map<string, VoxelData>();
        const R = 7;
        
        // Body
        for (let x = -R; x <= R; x++) {
            for (let y = -R; y <= R; y++) {
                for (let z = -R; z <= R; z++) {
                    if (Math.sqrt(x*x + y*y + z*z) <= R) {
                        let color = COLORS.SATURN_BODY;
                        // Bands
                        if (Math.abs(y) < 1.5) color = COLORS.SATURN_BAND;
                        if (Math.abs(y) > 4.5 && Math.abs(y) < 6) color = COLORS.SATURN_BAND;
                        setBlock(map, x, y, z, color);
                    }
                }
            }
        }
        
        // Rings
        const ringInner = 9;
        const ringOuter = 16;
        for (let x = -ringOuter; x <= ringOuter; x++) {
            for (let z = -ringOuter; z <= ringOuter; z++) {
                const d = Math.sqrt(x*x + z*z);
                if (d >= ringInner && d <= ringOuter) {
                    let color = COLORS.SATURN_RING_A;
                    if (d > 12 && d < 13) color = COLORS.SATURN_RING_B;
                    
                    // Thin rings
                    setBlock(map, x, 0, z, color);
                    // Add some thickness/texture
                    if (Math.random() > 0.6) setBlock(map, x, 0, z, color); 
                }
            }
        }

        return Array.from(map.values());
    },

    Sun: (): VoxelData[] => {
        const map = new Map<string, VoxelData>();
        const R = 11;
        
        for (let x = -R; x <= R; x++) {
            for (let y = -R; y <= R; y++) {
                for (let z = -R; z <= R; z++) {
                    const d = Math.sqrt(x*x + y*y + z*z);
                    if (d <= R) {
                        let color = COLORS.SUN_SURFACE;
                        if (Math.random() > 0.6) color = COLORS.SUN_CORE;
                        if (Math.random() > 0.9) color = COLORS.SUN_FLARE;
                        setBlock(map, x, y, z, color);
                    }
                }
            }
        }
        
        // Corona / Flares
        for (let i = 0; i < 40; i++) {
             const theta = Math.random() * Math.PI * 2;
             const phi = Math.random() * Math.PI;
             const r = R + 1 + Math.random() * 2;
             
             const x = r * Math.sin(phi) * Math.cos(theta);
             const y = r * Math.sin(phi) * Math.sin(theta);
             const z = r * Math.cos(phi);
             
             setBlock(map, x, y, z, COLORS.SUN_FLARE);
        }

        return Array.from(map.values());
    }
};