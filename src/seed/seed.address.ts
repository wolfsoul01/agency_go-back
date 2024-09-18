import { prisma } from '.';

export const seedAddress = async () => {
  const provinces = await prisma.provinces.createMany({
    data: [
      { name: 'Pinar del Río', code: 'PRI' },
      { name: 'Artemisa', code: 'ART' },
      { name: 'La Habana', code: 'HAB' },
      { name: 'Mayabeque', code: 'MAY' },
      { name: 'Matanzas', code: 'MAT' },
      { name: 'Cienfuegos', code: 'CFG' },
      { name: 'Villa Clara', code: 'VCL' },
      { name: 'Sancti Spíritus', code: 'SSP' },
      { name: 'Ciego de Ávila', code: 'CAV' },
      { name: 'Camagüey', code: 'CMG' },
      { name: 'Las Tunas', code: 'LTU' },
      { name: 'Holguín', code: 'HOL' },
      { name: 'Granma', code: 'GRA' },
      { name: 'Santiago de Cuba', code: 'SCU' },
      { name: 'Guantánamo', code: 'GTM' },
      { name: 'Isla de la Juventud', code: 'IJV' },
    ],
    skipDuplicates: true,
  });

  // Insertar los municipios (solo algunos de ejemplo)
  const municipalities = await prisma.municipalities.createMany({
    data: [
      { name: 'Pinar del Río', code: '101', provinceId: 1 },
      { name: 'Consolación del Sur', code: '102', provinceId: 1 },
      { name: 'San Juan y Martínez', code: '103', provinceId: 1 },
      { name: 'Artemisa', code: '201', provinceId: 2 },
      { name: 'Caimito', code: '202', provinceId: 2 },
      { name: 'Guanajay', code: '203', provinceId: 2 },
      { name: 'Habana Vieja', code: '301', provinceId: 3 },
      { name: 'Centro Habana', code: '302', provinceId: 3 },
      { name: 'Plaza de la Revolución', code: '303', provinceId: 3 },
      { name: 'San José de las Lajas', code: '401', provinceId: 4 },
      { name: 'Nueva Paz', code: '402', provinceId: 4 },
      { name: 'Matanzas', code: '501', provinceId: 5 },
      { name: 'Cárdenas', code: '502', provinceId: 5 },
      { name: 'Varadero', code: '503', provinceId: 5 },
      // Agregar más municipios según sea necesario
    ],
    skipDuplicates: true,
  });

  console.log(
    `Inserted ${municipalities.count} municipalities and ${provinces.count} provinces`,
  );
};
