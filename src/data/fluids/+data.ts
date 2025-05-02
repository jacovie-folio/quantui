import { FluidName } from './+enums';
import { Fluid } from './+types';

export const FluidDictionary: Record<FluidName, Fluid> = {
  [FluidName.WATER]: new Fluid({
    name: FluidName.WATER,
    display: 'Water',
    icon: 'water'
  }),
  [FluidName.STEAM]: new Fluid({
    name: FluidName.STEAM,
    display: 'Steam',
    icon: 'steam'
  }),
  [FluidName.PETROLEUM_GAS]: new Fluid({
    name: FluidName.PETROLEUM_GAS,
    display: 'Petroleum gas',
    icon: 'petroleum-gas'
  }),
  [FluidName.LIGHT_OIL]: new Fluid({
    name: FluidName.LIGHT_OIL,
    display: 'Light oil',
    icon: 'light-oil'
  }),
  [FluidName.HEAVY_OIL]: new Fluid({
    name: FluidName.HEAVY_OIL,
    display: 'Heavy oil',
    icon: 'heavy-oil'
  }),
  [FluidName.REFSYNGAS]: new Fluid({
    name: FluidName.REFSYNGAS,
    display: 'Refined syngas',
    icon: 'refsyngas'
  }),
  [FluidName.COAL_GAS]: new Fluid({
    name: FluidName.COAL_GAS,
    display: 'Coal gas',
    icon: 'coal-gas'
  }),
  [FluidName.SYNGAS]: new Fluid({
    name: FluidName.SYNGAS,
    display: 'Syngas',
    icon: 'syngas'
  }),
  [FluidName.ACETYLENE]: new Fluid({
    name: FluidName.ACETYLENE,
    display: 'Acetylene',
    icon: 'acetylene'
  }),
  [FluidName.ANTHRAQUINONE]: new Fluid({
    name: FluidName.ANTHRAQUINONE,
    display: 'Anthraquinone',
    icon: 'anthraquinone'
  }),
  [FluidName.AROMATICS]: new Fluid({
    name: FluidName.AROMATICS,
    display: 'Aromatics',
    icon: 'aromatics'
  }),
  [FluidName.BORIC_ACID]: new Fluid({
    name: FluidName.BORIC_ACID,
    display: 'Boric acid',
    icon: 'boric-acid'
  }),
  [FluidName.COAL_SLURRY]: new Fluid({
    name: FluidName.COAL_SLURRY,
    display: 'Coal water slurry',
    icon: 'coal-slurry'
  }),
  [FluidName.DIBORANE]: new Fluid({
    name: FluidName.DIBORANE,
    display: 'Diborane',
    icon: 'diborane'
  }),
  [FluidName.DIESEL]: new Fluid({
    name: FluidName.DIESEL,
    display: 'Diesel',
    icon: 'diesel'
  }),
  [FluidName.HYDROGEN_PEROXIDE]: new Fluid({
    name: FluidName.HYDROGEN_PEROXIDE,
    display: 'Hydrogen peroxide',
    icon: 'hydrogen-peroxide'
  }),
  [FluidName.OLEFIN]: new Fluid({
    name: FluidName.OLEFIN,
    display: 'Olefins',
    icon: 'olefin'
  }),
  [FluidName.TPA]: new Fluid({
    name: FluidName.TPA,
    display: 'Terephthaloyl chloride (TCl)',
    icon: 'tpa'
  }),
  [FluidName.COMBUSTION_MIXTURE1]: new Fluid({
    name: FluidName.COMBUSTION_MIXTURE1,
    display: 'Combustion mixture',
    icon: 'boron-mixture'
  }),
  [FluidName.DIRTY_WATER_HEAVY]: new Fluid({
    name: FluidName.DIRTY_WATER_HEAVY,
    display: 'Tailings',
    icon: 'dirty-water-heavy'
  }),
  [FluidName.FLUE_GAS]: new Fluid({
    name: FluidName.FLUE_GAS,
    display: 'Flue gas',
    icon: 'flue-gas'
  }),
  [FluidName.METHANOL]: new Fluid({
    name: FluidName.METHANOL,
    display: 'Methanol',
    icon: 'methanol'
  }),
  [FluidName.TAR]: new Fluid({
    name: FluidName.TAR,
    display: 'Tar',
    icon: 'tar'
  }),
  [FluidName.WATER_SALINE]: new Fluid({
    name: FluidName.WATER_SALINE,
    display: 'Saline water',
    icon: 'water-saline'
  }),
  [FluidName.SULFURIC_ACID]: new Fluid({
    name: FluidName.SULFURIC_ACID,
    display: 'Sulfuric acid',
    icon: 'sulfuric-acid'
  }),
  [FluidName.CREOSOTE]: new Fluid({
    name: FluidName.CREOSOTE,
    display: 'Creosote',
    icon: 'creosote'
  }),
  [FluidName.GLYCEROL]: new Fluid({
    name: FluidName.GLYCEROL,
    display: 'Glycerol',
    icon: 'glycerol'
  }),
  [FluidName.OLEOCHEMICALS]: new Fluid({
    name: FluidName.OLEOCHEMICALS,
    display: 'Oleochemicals',
    icon: 'oleochemicals'
  }),
  [FluidName.ORGANIC_SOLVENT]: new Fluid({
    name: FluidName.ORGANIC_SOLVENT,
    display: 'Organic solvent',
    icon: 'organic-solvent'
  }),
  [FluidName.SLACKED_LIME]: new Fluid({
    name: FluidName.SLACKED_LIME,
    display: 'Slaked lime',
    icon: 'slacked-lime'
  }),
  [FluidName.MOLYBDENITE_PULP]: new Fluid({
    name: FluidName.MOLYBDENITE_PULP,
    display: 'Molybdenite pulp',
    icon: 'molybdenite-pulp'
  }),
  [FluidName.MOLYBDENUM_PULP]: new Fluid({
    name: FluidName.MOLYBDENUM_PULP,
    display: 'Molybdenum pulp',
    icon: 'molybdenum-pulp'
  }),
  [FluidName.CRITICAL_STEAM]: new Fluid({
    name: FluidName.CRITICAL_STEAM,
    display: 'Supercritical steam',
    icon: 'critical-steam'
  }),
  [FluidName.DEUTERIUM]: new Fluid({
    name: FluidName.DEUTERIUM,
    display: 'Deuterium',
    icon: 'deuterium'
  }),
  [FluidName.ENRICHED_WATER]: new Fluid({
    name: FluidName.ENRICHED_WATER,
    display: 'Enriched water',
    icon: 'enriched-ash'
  }),
  [FluidName.GREASE]: new Fluid({
    name: FluidName.GREASE,
    display: 'Grease',
    icon: 'grease'
  }),
  [FluidName.HEAVY_WATER]: new Fluid({
    name: FluidName.HEAVY_WATER,
    display: 'Heavy water',
    icon: 'heavy-water'
  }),
  [FluidName.HELIUM3]: new Fluid({
    name: FluidName.HELIUM3,
    display: 'Helium-3',
    icon: 'helium3'
  }),
  [FluidName.PRESSURED_STEAM]: new Fluid({
    name: FluidName.PRESSURED_STEAM,
    display: 'Pressurized steam',
    icon: 'pressured-air'
  }),
  [FluidName.PROTON]: new Fluid({
    name: FluidName.PROTON,
    display: 'Hydrogen proton',
    icon: 'proton'
  }),
  [FluidName.TRITIUM]: new Fluid({
    name: FluidName.TRITIUM,
    display: 'Tritium',
    icon: 'tritium'
  }),
  [FluidName.VACUUM]: new Fluid({
    name: FluidName.VACUUM,
    display: 'Vacuum',
    icon: 'vacuum'
  }),
  [FluidName.BACTERIA_1]: new Fluid({
    name: FluidName.BACTERIA_1,
    display: 'Alien bacteria',
    icon: 'bacteria-1'
  }),
  [FluidName.ETHANOLAMINE]: new Fluid({
    name: FluidName.ETHANOLAMINE,
    display: 'Ethanolamine',
    icon: 'ethanolamine'
  }),
  [FluidName.HIGH_PURIFIED_GAS]: new Fluid({
    name: FluidName.HIGH_PURIFIED_GAS,
    display: 'Highly purified gas',
    icon: 'high-purified-gas'
  }),
  [FluidName.LIQUID_RICH_GAS]: new Fluid({
    name: FluidName.LIQUID_RICH_GAS,
    display: 'Liquid rich gas',
    icon: 'liquid-rich-gas'
  }),
  [FluidName.PHYTOPLANKTON]: new Fluid({
    name: FluidName.PHYTOPLANKTON,
    display: 'Phytoplankton',
    icon: 'phytoplankton'
  }),
  [FluidName.PURIER_HELIUM]: new Fluid({
    name: FluidName.PURIER_HELIUM,
    display: 'Crude helium',
    icon: 'purier-helium'
  }),
  [FluidName.RICH_GAS]: new Fluid({
    name: FluidName.RICH_GAS,
    display: 'Rich gas',
    icon: 'rich-gas'
  }),
  [FluidName.PRESSURED_WATER]: new Fluid({
    name: FluidName.PRESSURED_WATER,
    display: 'Pressurized water',
    icon: 'pressured-water'
  }),
  [FluidName.WASTE_WATER]: new Fluid({
    name: FluidName.WASTE_WATER,
    display: 'Wastewater',
    icon: 'waste-water'
  }),
  [FluidName.VANABINS]: new Fluid({
    name: FluidName.VANABINS,
    display: 'Vanabins',
    icon: 'vanabins'
  }),
  [FluidName.ACID_STRIP_SOLUTION]: new Fluid({
    name: FluidName.ACID_STRIP_SOLUTION,
    display: 'Acid strip solution',
    icon: 'acid-strip-solution'
  }),
  [FluidName.BLUE_LIQUOR]: new Fluid({
    name: FluidName.BLUE_LIQUOR,
    display: 'Blue liquor',
    icon: 'blue-liquor'
  }),
  [FluidName.DIAMOND_CONCENTRATE]: new Fluid({
    name: FluidName.DIAMOND_CONCENTRATE,
    display: 'Diamond concentrate',
    icon: 'diamond-concentrate'
  }),
  [FluidName.DIAMOND_TAILINGS]: new Fluid({
    name: FluidName.DIAMOND_TAILINGS,
    display: 'Diamond tailings',
    icon: 'diamond-tailings'
  }),
  [FluidName.JIG_CONCENTRATE]: new Fluid({
    name: FluidName.JIG_CONCENTRATE,
    display: 'Diamond water concentrate',
    icon: 'jig-concentrate'
  }),
  [FluidName.KIMBERLITE_PULP]: new Fluid({
    name: FluidName.KIMBERLITE_PULP,
    display: 'Kimberlite pulp',
    icon: 'kimberlite-pulp'
  }),
  [FluidName.VPULP1]: new Fluid({
    name: FluidName.VPULP1,
    display: 'Vanadium pulp (stage 1)',
    icon: 'vpulp1'
  }),
  [FluidName.JIG_GRADE1]: new Fluid({
    name: FluidName.JIG_GRADE1,
    display: 'Diamond water (grade 1)',
    icon: 'jig-grade1'
  }),
  [FluidName.JIG_GRADE2]: new Fluid({
    name: FluidName.JIG_GRADE2,
    display: 'Diamond water (grade 2)',
    icon: 'jig-grade2'
  }),
  [FluidName.JIG_GRADE3]: new Fluid({
    name: FluidName.JIG_GRADE3,
    display: 'Diamond water (grade 3)',
    icon: 'jig-grade3'
  }),
  [FluidName.VPULP_PRECIP]: new Fluid({
    name: FluidName.VPULP_PRECIP,
    display: 'Vanadium precipitate',
    icon: 'vpulp-precip'
  }),
  [FluidName.VPULP2]: new Fluid({
    name: FluidName.VPULP2,
    display: 'Vanadium pulp (stage 2)',
    icon: 'vpulp2'
  }),
  [FluidName.VPULP4]: new Fluid({
    name: FluidName.VPULP4,
    display: 'Vanadium pulp (stage 4)',
    icon: 'vpulp4'
  }),
  [FluidName.VPULP5]: new Fluid({
    name: FluidName.VPULP5,
    display: 'Vanadium pulp (stage 5)',
    icon: 'vpulp5'
  }),
  [FluidName.VPULP3]: new Fluid({
    name: FluidName.VPULP3,
    display: 'Vanadium pulp (stage 3)',
    icon: 'vpulp3'
  }),
  [FluidName.PRESSURED_VPULP]: new Fluid({
    name: FluidName.PRESSURED_VPULP,
    display: 'Pressurized vanadium pulp',
    icon: 'pressured-vpulp'
  }),
  [FluidName.VANADATES]: new Fluid({
    name: FluidName.VANADATES,
    display: 'Vanadates',
    icon: 'vanadates'
  }),
  [FluidName.ORGANIC_VANADATE]: new Fluid({
    name: FluidName.ORGANIC_VANADATE,
    display: 'Organic vanadates',
    icon: 'organic-vanadate'
  }),
  [FluidName.VANADIUM_SOLUTION]: new Fluid({
    name: FluidName.VANADIUM_SOLUTION,
    display: 'Vanadium solution',
    icon: 'vanadium-solution'
  }),
  [FluidName.USED_SOLVENT]: new Fluid({
    name: FluidName.USED_SOLVENT,
    display: 'Used solvent',
    icon: 'used-solvent'
  }),
  [FluidName.VANADIUM_CONCENTRATE]: new Fluid({
    name: FluidName.VANADIUM_CONCENTRATE,
    display: 'Vanadium concentrate',
    icon: 'vanadium-concentrate'
  }),
  [FluidName.INDUSTRIAL_SOLVENT]: new Fluid({
    name: FluidName.INDUSTRIAL_SOLVENT,
    display: 'Industrial solvent',
    icon: 'industrial-solvent'
  }),
  [FluidName.PREGNANT_SOLUTION]: new Fluid({
    name: FluidName.PREGNANT_SOLUTION,
    display: 'Pregnant V2O5 acid solution',
    icon: 'pregnant-solution'
  }),
  [FluidName.SODA_ASH]: new Fluid({
    name: FluidName.SODA_ASH,
    display: 'Soda ash regeneration solution',
    icon: 'soda-ash'
  }),
  [FluidName.COLD_AIR]: new Fluid({
    name: FluidName.COLD_AIR,
    display: 'Cold air',
    icon: 'cold-air'
  }),
  [FluidName.COLD_CLEAN_AIR]: new Fluid({
    name: FluidName.COLD_CLEAN_AIR,
    display: 'Cold clean air',
    icon: 'cold-clean-air'
  }),
  [FluidName.DRY_GAS_STREAM]: new Fluid({
    name: FluidName.DRY_GAS_STREAM,
    display: 'Dry gas stream',
    icon: 'dry-gas-stream'
  }),
  [FluidName.GAS_STREAM]: new Fluid({
    name: FluidName.GAS_STREAM,
    display: 'Gas stream',
    icon: 'gas-stream'
  }),
  [FluidName.HELIUM]: new Fluid({
    name: FluidName.HELIUM,
    display: 'Helium',
    icon: 'helium'
  }),
  [FluidName.HELIUM_RICH_GAS]: new Fluid({
    name: FluidName.HELIUM_RICH_GAS,
    display: 'Helium rich gas',
    icon: 'helium-rich-gas'
  }),
  [FluidName.LIQUID_HELIUM]: new Fluid({
    name: FluidName.LIQUID_HELIUM,
    display: 'Liquid helium',
    icon: 'liquid-helium'
  }),
  [FluidName.LIQUID_NITROGEN]: new Fluid({
    name: FluidName.LIQUID_NITROGEN,
    display: 'Liquid nitrogen',
    icon: 'liquid-nitrogen'
  }),
  [FluidName.LIQUID_PETGAS]: new Fluid({
    name: FluidName.LIQUID_PETGAS,
    display: 'Liquified petroleum gas',
    icon: 'liquid-petgas'
  }),
  [FluidName.LIQUID_PURE_AIR]: new Fluid({
    name: FluidName.LIQUID_PURE_AIR,
    display: 'Liquid clean air',
    icon: 'liquid-pure-air'
  }),
  [FluidName.PRESSURED_AIR]: new Fluid({
    name: FluidName.PRESSURED_AIR,
    display: 'Pressurized air',
    icon: 'pressured-air'
  }),
  [FluidName.PURIFIED_AIR]: new Fluid({
    name: FluidName.PURIFIED_AIR,
    display: 'Purified air',
    icon: 'purified-air'
  }),
  [FluidName.CRUDE_OIL]: new Fluid({
    name: FluidName.CRUDE_OIL,
    display: 'Crude oil',
    icon: 'crude-oil'
  }),
  [FluidName.GASOLINE]: new Fluid({
    name: FluidName.GASOLINE,
    display: 'Gasoline',
    icon: 'gasoline'
  }),
  [FluidName.ANILINE]: new Fluid({
    name: FluidName.ANILINE,
    display: 'Aniline',
    icon: 'aniline'
  }),
  [FluidName.BCA]: new Fluid({
    name: FluidName.BCA,
    display: 'Benzene Cyanoacrylic Acid',
    icon: 'bca'
  }),
  [FluidName.BUFFER_SOLUTION]: new Fluid({
    name: FluidName.BUFFER_SOLUTION,
    display: 'Buffer Solution',
    icon: 'buffer-solution'
  }),
  [FluidName.CHLOROAURIC_ACID]: new Fluid({
    name: FluidName.CHLOROAURIC_ACID,
    display: 'Chloroauric Acid',
    icon: 'chloroauric-acid'
  }),
  [FluidName.CLEAN_ORGANIC_PULP]: new Fluid({
    name: FluidName.CLEAN_ORGANIC_PULP,
    display: 'Clean Organic Pulp',
    icon: 'clean-organic-pulp'
  }),
  [FluidName.CRUDE_ENZYME]: new Fluid({
    name: FluidName.CRUDE_ENZYME,
    display: 'Crude Enzyme',
    icon: 'crude-enzyme'
  }),
  [FluidName.DCM]: new Fluid({
    name: FluidName.DCM,
    display: 'Dichloromethane (DCM)',
    icon: 'dcm'
  }),
  [FluidName.GEOTHERMAL_WATER]: new Fluid({
    name: FluidName.GEOTHERMAL_WATER,
    display: 'Geothermal Water',
    icon: 'geothermal-water'
  }),
  [FluidName.MOVA_PULP1]: new Fluid({
    name: FluidName.MOVA_PULP1,
    display: 'Mova Pulp 1',
    icon: 'mova-pulp1'
  }),
  [FluidName.MOVA_PULP2]: new Fluid({
    name: FluidName.MOVA_PULP2,
    display: 'Mova Pulp 2',
    icon: 'mova-pulp2'
  }),
  [FluidName.MOVA_PULP3]: new Fluid({
    name: FluidName.MOVA_PULP3,
    display: 'Mova Pulp 3',
    icon: 'mova-pulp3'
  }),
  [FluidName.ORGANIC_PULP]: new Fluid({
    name: FluidName.ORGANIC_PULP,
    display: 'Organic Pulp',
    icon: 'organic-pulp'
  }),
  [FluidName.PRE_ENZYME]: new Fluid({
    name: FluidName.PRE_ENZYME,
    display: 'Pre enzyme',
    icon: 'pre-enzyme'
  }),
  [FluidName.TEOS]: new Fluid({
    name: FluidName.TEOS,
    display: 'Tetraethyl orthosilicate (TEOS)',
    icon: 'teos'
  }),
  [FluidName.TRICHLOROSILANE]: new Fluid({
    name: FluidName.TRICHLOROSILANE,
    display: 'Trichlorosilane',
    icon: 'trichlorosilane'
  }),
  [FluidName.PURE_TRICHLOROSILANE]: new Fluid({
    name: FluidName.PURE_TRICHLOROSILANE,
    display: 'Pure Trichlorosilane',
    icon: 'pure-trichlorosilane'
  }),
  [FluidName.ALLYLAMINE]: new Fluid({
    name: FluidName.ALLYLAMINE,
    display: 'Allylamine',
    icon: 'allylamine'
  }),
  [FluidName.ANOLYTE]: new Fluid({
    name: FluidName.ANOLYTE,
    display: 'Anolyte',
    icon: 'anolyte'
  }),
  [FluidName.BUTANOL]: new Fluid({
    name: FluidName.BUTANOL,
    display: 'Butanol',
    icon: 'butanol'
  }),
  [FluidName.DEUTERIUM_SULFIDE]: new Fluid({
    name: FluidName.DEUTERIUM_SULFIDE,
    display: 'Deuterium sulfide',
    icon: 'deuterium-fusion'
  }),
  [FluidName.DIRTY_WATER_LIGHT]: new Fluid({
    name: FluidName.DIRTY_WATER_LIGHT,
    display: 'Muddy sludge',
    icon: 'dirty-water-light'
  }),
  [FluidName.FATTY_ACIDS]: new Fluid({
    name: FluidName.FATTY_ACIDS,
    display: 'Fatty Acids',
    icon: 'fatty-acids'
  }),
  [FluidName.FILTERED_SILICATE_SOLUTION]: new Fluid({
    name: FluidName.FILTERED_SILICATE_SOLUTION,
    display: 'Filtered Silicate Solution',
    icon: 'filtered-silicate-solution'
  }),
  [FluidName.FLUORINE_GAS]: new Fluid({
    name: FluidName.FLUORINE_GAS,
    display: 'Fluorine gas',
    icon: 'fluorine-gas'
  }),
  [FluidName.HOT_MOLTEN_SALT]: new Fluid({
    name: FluidName.HOT_MOLTEN_SALT,
    display: 'Hot Molten Salt',
    icon: 'hot-molten-salt'
  }),
  [FluidName.HOT_SOLUTION]: new Fluid({
    name: FluidName.HOT_SOLUTION,
    display: 'Hot Solution',
    icon: 'hot-solution'
  }),
  [FluidName.HYDROFLUORIC_ACID]: new Fluid({
    name: FluidName.HYDROFLUORIC_ACID,
    display: 'Hydrofluoric acid',
    icon: 'hydrofluoric-acid'
  }),
  [FluidName.HYDROGEN_SULFIDE]: new Fluid({
    name: FluidName.HYDROGEN_SULFIDE,
    display: 'Hydrogen sulfide',
    icon: 'carbon-sulfide'
  }),
  [FluidName.MIDDLE_PROCESSED_LARD]: new Fluid({
    name: FluidName.MIDDLE_PROCESSED_LARD,
    display: 'Middle Processed Lard',
    icon: 'middle-processed-lard'
  }),
  [FluidName.MOLTEN_FLUORIDE_THORIUM]: new Fluid({
    name: FluidName.MOLTEN_FLUORIDE_THORIUM,
    display: 'Molten fluoride with thorium',
    icon: 'molten-fluoride-thorium-pa233'
  }),
  [FluidName.MOLTEN_FLUORIDE_THORIUM_PA233]: new Fluid({
    name: FluidName.MOLTEN_FLUORIDE_THORIUM_PA233,
    display: 'Molten fluoride with Pa-233',
    icon: 'molten-fluoride-thorium-pa233'
  }),
  [FluidName.MOLTEN_SALT]: new Fluid({
    name: FluidName.MOLTEN_SALT,
    display: 'Molten Salt',
    icon: 'molten-salt'
  }),
  [FluidName.MOTHER_LIQUOR]: new Fluid({
    name: FluidName.MOTHER_LIQUOR,
    display: 'Mother Liquor',
    icon: 'mother-liquor'
  }),
  [FluidName.NICKEL_CARBONYL]: new Fluid({
    name: FluidName.NICKEL_CARBONYL,
    display: 'Nickel Carbonyl',
    icon: 'nickel-carbonyl'
  }),
  [FluidName.NUMAL_INK]: new Fluid({
    name: FluidName.NUMAL_INK,
    display: 'Numal Ink',
    icon: 'numal-ink'
  }),
  [FluidName.ORGANIC_ACID_ANHYDRIDE]: new Fluid({
    name: FluidName.ORGANIC_ACID_ANHYDRIDE,
    display: 'Organic Acid Anhydride',
    icon: 'organic-acid-anhydride'
  }),
  [FluidName.PERYLENE]: new Fluid({
    name: FluidName.PERYLENE,
    display: 'Perylene',
    icon: 'perylene'
  }),
  [FluidName.PHOSPHORUS_TRICLORIDE]: new Fluid({
    name: FluidName.PHOSPHORUS_TRICLORIDE,
    display: 'Phosphorus trichloride',
    icon: 'phosphorus-tricloride'
  }),
  [FluidName.PHOSPHORYL_CHLORIDE]: new Fluid({
    name: FluidName.PHOSPHORYL_CHLORIDE,
    display: 'Phosphoryl chloride',
    icon: 'phosphoryl-chloride'
  }),
  [FluidName.PRE_PHENOTHIAZINE]: new Fluid({
    name: FluidName.PRE_PHENOTHIAZINE,
    display: 'Pre phenothiazine',
    icon: 'pre-phenothiazine'
  }),
  [FluidName.PROCESSED_FATTY_ACIDS]: new Fluid({
    name: FluidName.PROCESSED_FATTY_ACIDS,
    display: 'Processed Fatty Acids',
    icon: 'processed-fatty-acids'
  }),
  [FluidName.R1]: new Fluid({
    name: FluidName.R1,
    display: 'R1 Solution',
    icon: 'r1'
  }),
  [FluidName.R2]: new Fluid({
    name: FluidName.R2,
    display: 'R2 Solution',
    icon: 'r2'
  }),
  [FluidName.R3]: new Fluid({
    name: FluidName.R3,
    display: 'R3 Solution',
    icon: 'r3'
  }),
  [FluidName.R4]: new Fluid({
    name: FluidName.R4,
    display: 'R4 Solution',
    icon: 'r4'
  }),
  [FluidName.SALT_SOLUTION]: new Fluid({
    name: FluidName.SALT_SOLUTION,
    display: 'Salt Solution',
    icon: 'salt-solution'
  }),
  [FluidName.SILICATE_SOLUTION]: new Fluid({
    name: FluidName.SILICATE_SOLUTION,
    display: 'Silicate Solution',
    icon: 'silicate-solution'
  }),
  [FluidName.VINYL_ACETATE]: new Fluid({
    name: FluidName.VINYL_ACETATE,
    display: 'Vinyl Acetate',
    icon: 'vinyl-acetate'
  }),
  [FluidName.MOLTEN_NXZNGD]: new Fluid({
    name: FluidName.MOLTEN_NXZNGD,
    display: 'Molten Nexelit-Zinc-Gadolinium',
    icon: 'molten-nxzngd'
  }),
  [FluidName.AC]: new Fluid({
    name: FluidName.AC,
    display: 'Americium curium waste stream',
    icon: 'ac'
  }),
  [FluidName.AC_OXYGENATED]: new Fluid({
    name: FluidName.AC_OXYGENATED,
    display: 'Americium oxide waste stream',
    icon: 'ac-oxygenated'
  }),
  [FluidName.C_OXYGENATED]: new Fluid({
    name: FluidName.C_OXYGENATED,
    display: 'Curium oxide waste stream',
    icon: 'c-oxygenated'
  }),
  [FluidName.NEUTRON]: new Fluid({
    name: FluidName.NEUTRON,
    display: 'Neutron',
    icon: 'neutron'
  }),
  [FluidName.PLUTONIUM_PEROXIDE]: new Fluid({
    name: FluidName.PLUTONIUM_PEROXIDE,
    display: 'Plutonium peroxide',
    icon: 'plutonium-peroxide'
  }),
  [FluidName.PUO2]: new Fluid({
    name: FluidName.PUO2,
    display: 'Plutonium dioxide',
    icon: 'puo2'
  }),
  [FluidName.PUREX_CONCENTRATE_1]: new Fluid({
    name: FluidName.PUREX_CONCENTRATE_1,
    display: 'Purex concentrate 1',
    icon: 'purex-concentrate-1'
  }),
  [FluidName.PUREX_CONCENTRATE_2]: new Fluid({
    name: FluidName.PUREX_CONCENTRATE_2,
    display: 'Purex concentrate 2',
    icon: 'purex-concentrate-2'
  }),
  [FluidName.PUREX_CONCENTRATE_3]: new Fluid({
    name: FluidName.PUREX_CONCENTRATE_3,
    display: 'Purex concentrate 3',
    icon: 'purex-concentrate-3'
  }),
  [FluidName.PUREX_CONCENTRATE_4]: new Fluid({
    name: FluidName.PUREX_CONCENTRATE_4,
    display: 'Purex concentrate 4',
    icon: 'purex-concentrate-4'
  }),
  [FluidName.PUREX_CONCENTRATE_5]: new Fluid({
    name: FluidName.PUREX_CONCENTRATE_5,
    display: 'Purex concentrate 5',
    icon: 'purex-concentrate-5'
  }),
  [FluidName.PUREX_PU_CONCENTRATE_1]: new Fluid({
    name: FluidName.PUREX_PU_CONCENTRATE_1,
    display: 'Purex PU concentrate 1',
    icon: 'purex-pu-concentrate-1'
  }),
  [FluidName.PUREX_PU_CONCENTRATE_2]: new Fluid({
    name: FluidName.PUREX_PU_CONCENTRATE_2,
    display: 'Purex PU concentrate 2',
    icon: 'purex-pu-concentrate-2'
  }),
  [FluidName.PUREX_PU_CONCENTRATE_3]: new Fluid({
    name: FluidName.PUREX_PU_CONCENTRATE_3,
    display: 'Purex PU concentrate 3',
    icon: 'purex-pu-concentrate-3'
  }),
  [FluidName.PUREX_RAFFINATE]: new Fluid({
    name: FluidName.PUREX_RAFFINATE,
    display: 'Purex raffinate 1',
    icon: 'purex-raffinate'
  }),
  [FluidName.PUREX_RAFFINATE_2]: new Fluid({
    name: FluidName.PUREX_RAFFINATE_2,
    display: 'Purex raffinate 2',
    icon: 'purex-raffinate-2'
  }),
  [FluidName.PUREX_RAFFINATE_3]: new Fluid({
    name: FluidName.PUREX_RAFFINATE_3,
    display: 'Purex raffinate 3',
    icon: 'purex-raffinate-3'
  }),
  [FluidName.PUREX_U_CONCENTRATE_1]: new Fluid({
    name: FluidName.PUREX_U_CONCENTRATE_1,
    display: 'Purex U concentrate 1',
    icon: 'purex-u-concentrate-1'
  }),
  [FluidName.PUREX_U_CONCENTRATE_2]: new Fluid({
    name: FluidName.PUREX_U_CONCENTRATE_2,
    display: 'Purex U concentrate 2',
    icon: 'purex-u-concentrate-2'
  }),
  [FluidName.PUREX_U_CONCENTRATE_3]: new Fluid({
    name: FluidName.PUREX_U_CONCENTRATE_3,
    display: 'Purex U concentrate 3',
    icon: 'purex-u-concentrate-3'
  }),
  [FluidName.PUREX_WASTE_1]: new Fluid({
    name: FluidName.PUREX_WASTE_1,
    display: 'Purex waste 1',
    icon: 'purex-waste-1'
  }),
  [FluidName.PUREX_WASTE_2]: new Fluid({
    name: FluidName.PUREX_WASTE_2,
    display: 'Purex waste 2',
    icon: 'purex-waste-2'
  }),
  [FluidName.PUREX_WASTE_3]: new Fluid({
    name: FluidName.PUREX_WASTE_3,
    display: 'Purex waste 3',
    icon: 'purex-waste-3'
  }),
  [FluidName.REACTOR_WASTE_1]: new Fluid({
    name: FluidName.REACTOR_WASTE_1,
    display: 'Spent reactor fuel',
    icon: 'reactor-waste-1'
  }),
  [FluidName.REACTOR_WASTE_2]: new Fluid({
    name: FluidName.REACTOR_WASTE_2,
    display: 'Spent MOX reactor fuel',
    icon: 'reactor-waste-2'
  }),
  [FluidName.SB_PHOSPHATE_1]: new Fluid({
    name: FluidName.SB_PHOSPHATE_1,
    display: 'Antimony phosphate 1',
    icon: 'powdered-phosphate-rock-0'
  }),
  [FluidName.SB_PHOSPHATE_2]: new Fluid({
    name: FluidName.SB_PHOSPHATE_2,
    display: 'Antimony phosphate 2',
    icon: 'powdered-phosphate-rock-0'
  }),
  [FluidName.SB_PHOSPHATE_3]: new Fluid({
    name: FluidName.SB_PHOSPHATE_3,
    display: 'Antimony phosphate 3',
    icon: 'powdered-phosphate-rock-0'
  }),
  [FluidName.SOLAR_CONCENTRATION]: new Fluid({
    name: FluidName.SOLAR_CONCENTRATION,
    display: 'Solar concentration',
    icon: 'solar-concentrator'
  }),
  [FluidName.UF6]: new Fluid({
    name: FluidName.UF6,
    display: 'Uranium hexafluoride',
    icon: 'uf6'
  }),
  [FluidName.VOID]: new Fluid({
    name: FluidName.VOID,
    display: 'Void',
    icon: 'biomass-flavonoids'
  }),
  [FluidName.CARBON_DIOXIDE]: new Fluid({
    name: FluidName.CARBON_DIOXIDE,
    display: 'Carbon dioxide',
    icon: 'carbon-dioxide'
  }),
  [FluidName.LIQUID_MANURE]: new Fluid({
    name: FluidName.LIQUID_MANURE,
    display: 'Liquid manure',
    icon: 'liquid-manure'
  }),
  [FluidName.MANURE_BACTERIA]: new Fluid({
    name: FluidName.MANURE_BACTERIA,
    display: 'Manure bacteria',
    icon: 'manure-bacteria'
  }),
  [FluidName.ZOGNA_BACTERIA]: new Fluid({
    name: FluidName.ZOGNA_BACTERIA,
    display: 'Zogna bacteria',
    icon: 'zogna-bacteria'
  }),
  [FluidName.FORMAMIDE]: new Fluid({
    name: FluidName.FORMAMIDE,
    display: 'Formamide',
    icon: 'formamide'
  }),
  [FluidName.NITROUS_OXIDE]: new Fluid({
    name: FluidName.NITROUS_OXIDE,
    display: 'Nitrous oxide',
    icon: 'nitrous-oxide'
  }),
  [FluidName.A_MOLASSE]: new Fluid({
    name: FluidName.A_MOLASSE,
    display: 'A type molasses',
    icon: 'a-molasse'
  }),
  [FluidName.ARQAD_JELLY]: new Fluid({
    name: FluidName.ARQAD_JELLY,
    display: 'Arqad jelly',
    icon: 'arqad-jelly'
  }),
  [FluidName.ARTHROPOD_BLOOD]: new Fluid({
    name: FluidName.ARTHROPOD_BLOOD,
    display: 'Arthropod blood',
    icon: 'arthropod-blood'
  }),
  [FluidName.ARTIFICIAL_BLOOD]: new Fluid({
    name: FluidName.ARTIFICIAL_BLOOD,
    display: 'Artificial blood',
    icon: 'artificial-blood'
  }),
  [FluidName.AUTOANTIGENS]: new Fluid({
    name: FluidName.AUTOANTIGENS,
    display: 'Autoantigens',
    icon: 'autoantigens'
  }),
  [FluidName.B_MOLASSE]: new Fluid({
    name: FluidName.B_MOLASSE,
    display: 'B type molasses',
    icon: 'b-molasse'
  }),
  [FluidName.BEE_VENOM]: new Fluid({
    name: FluidName.BEE_VENOM,
    display: 'Arqad venom',
    icon: 'bee-venom'
  }),
  [FluidName.BIO_OIL]: new Fluid({
    name: FluidName.BIO_OIL,
    display: 'Bio oil',
    icon: 'bio-oil'
  }),
  [FluidName.BLOOD]: new Fluid({
    name: FluidName.BLOOD,
    display: 'Blood',
    icon: 'blood'
  }),
  [FluidName.CADAVERIC_ARUM_MK02_SEED_JUICE]: new Fluid({
    name: FluidName.CADAVERIC_ARUM_MK02_SEED_JUICE,
    display: 'Cadaveric arum MK 02 pulp',
    icon: 'cadaveric-arum-mk02-seed-juice'
  }),
  [FluidName.CADAVERIC_ARUM_MK03_SEED_JUICE]: new Fluid({
    name: FluidName.CADAVERIC_ARUM_MK03_SEED_JUICE,
    display: 'Cadaveric arum MK 03 pulp',
    icon: 'cadaveric-arum-mk03-seed-juice'
  }),
  [FluidName.CADAVERIC_ARUM_MK04_SEED_JUICE]: new Fluid({
    name: FluidName.CADAVERIC_ARUM_MK04_SEED_JUICE,
    display: 'Cadaveric arum MK 04 pulp',
    icon: 'cadaveric-arum-mk04-seed-juice'
  }),
  [FluidName.CASEIN_MIXTURE]: new Fluid({
    name: FluidName.CASEIN_MIXTURE,
    display: 'Casein mixture',
    icon: 'casein-mixture'
  }),
  [FluidName.CASEIN_PULP_01]: new Fluid({
    name: FluidName.CASEIN_PULP_01,
    display: 'Casein pulp (stage 1)',
    icon: 'casein-pulp-01'
  }),
  [FluidName.CASEIN_PULP_02]: new Fluid({
    name: FluidName.CASEIN_PULP_02,
    display: 'Casein pulp (stage 2)',
    icon: 'casein-pulp-02'
  }),
  [FluidName.CASEIN_SOLUTION]: new Fluid({
    name: FluidName.CASEIN_SOLUTION,
    display: 'Casein solution',
    icon: 'casein-solution'
  }),
  [FluidName.CHELATOR]: new Fluid({
    name: FluidName.CHELATOR,
    display: 'Chelators',
    icon: 'chelator'
  }),
  [FluidName.CHLORAL]: new Fluid({
    name: FluidName.CHLORAL,
    display: 'Chloral',
    icon: 'chloral'
  }),
  [FluidName.DDA]: new Fluid({
    name: FluidName.DDA,
    display: 'Diethyl dithiophosphoric acid (DDA)',
    icon: 'dda'
  }),
  [FluidName.DECALIN]: new Fluid({
    name: FluidName.DECALIN,
    display: 'Decalin',
    icon: 'decalin'
  }),
  [FluidName.DEPOLYMERIZED_ORGANICS]: new Fluid({
    name: FluidName.DEPOLYMERIZED_ORGANICS,
    display: 'Depolymerised organics',
    icon: 'depolymerized-organics'
  }),
  [FluidName.ETHANOL]: new Fluid({
    name: FluidName.ETHANOL,
    display: 'Ethanol',
    icon: 'ethanol'
  }),
  [FluidName.ETHYL_MERCAPTAN]: new Fluid({
    name: FluidName.ETHYL_MERCAPTAN,
    display: 'Ethyl mercaptan',
    icon: 'ethyl-mercaptan'
  }),
  [FluidName.FETAL_SERUM]: new Fluid({
    name: FluidName.FETAL_SERUM,
    display: 'Fetal serum',
    icon: 'fetal-serum'
  }),
  [FluidName.FISH_EMULSION]: new Fluid({
    name: FluidName.FISH_EMULSION,
    display: 'Fish emulsion',
    icon: 'fish-emulsion'
  }),
  [FluidName.FISH_HYDROLYSATE]: new Fluid({
    name: FluidName.FISH_HYDROLYSATE,
    display: 'Fish hydrolysate',
    icon: 'fish-hydrolysate'
  }),
  [FluidName.FISH_OIL]: new Fluid({
    name: FluidName.FISH_OIL,
    display: 'Fish oil',
    icon: 'fish-oil'
  }),
  [FluidName.FLAVONOIDS]: new Fluid({
    name: FluidName.FLAVONOIDS,
    display: 'Flavonoids',
    icon: 'flavonoids'
  }),
  [FluidName.FLUTEC_PP6]: new Fluid({
    name: FluidName.FLUTEC_PP6,
    display: 'Flutec PP6',
    icon: 'flutec-pp6'
  }),
  [FluidName.GTA]: new Fluid({
    name: FluidName.GTA,
    display: 'Gene transfer agent (GTA)',
    icon: 'gta'
  }),
  [FluidName.MCB]: new Fluid({
    name: FluidName.MCB,
    display: 'Monochlorobenzene (MCB)',
    icon: 'mcb'
  }),
  [FluidName.MILK]: new Fluid({
    name: FluidName.MILK,
    display: 'Korlex milk',
    icon: 'milk'
  }),
  [FluidName.MUTANT_ENZYMES]: new Fluid({
    name: FluidName.MUTANT_ENZYMES,
    display: 'Mutant enzymes',
    icon: 'mutant-enzymes'
  }),
  [FluidName.NITROGEN_MUSTARD]: new Fluid({
    name: FluidName.NITROGEN_MUSTARD,
    display: 'Nitrogen mustard',
    icon: 'nitrogen-mustard'
  }),
  [FluidName.PRE_PESTICIDE_01]: new Fluid({
    name: FluidName.PRE_PESTICIDE_01,
    display: 'Pre pesticide 01',
    icon: 'pre-pesticide-01'
  }),
  [FluidName.PRE_PESTICIDE_02]: new Fluid({
    name: FluidName.PRE_PESTICIDE_02,
    display: 'Pre pesticide 02',
    icon: 'pre-pesticide-02'
  }),
  [FluidName.PSC]: new Fluid({
    name: FluidName.PSC,
    display: 'Pluripotent stem cells',
    icon: 'psc'
  }),
  [FluidName.SUBCRITICAL_WATER]: new Fluid({
    name: FluidName.SUBCRITICAL_WATER,
    display: 'Subcritical water',
    icon: 'subcritical-water'
  }),
  [FluidName.SWEET_SYRUP]: new Fluid({
    name: FluidName.SWEET_SYRUP,
    display: 'Sweet syrup',
    icon: 'sweet-syrup'
  }),
  [FluidName.SYRUP_01]: new Fluid({
    name: FluidName.SYRUP_01,
    display: 'Concentrated seed syrup',
    icon: 'syrup-01'
  }),
  [FluidName.WAX]: new Fluid({
    name: FluidName.WAX,
    display: 'Wax',
    icon: 'wax'
  }),
  [FluidName.XENOGENIC_CELLS]: new Fluid({
    name: FluidName.XENOGENIC_CELLS,
    display: 'Xenogeneic cells',
    icon: 'xenogenic-cells'
  }),
  [FluidName.ACIDGAS]: new Fluid({
    name: FluidName.ACIDGAS,
    display: 'Acid gas',
    icon: 'acidgas'
  }),
  [FluidName.DMS]: new Fluid({
    name: FluidName.DMS,
    display: 'Dimethyl sulfide (DMS)',
    icon: 'dms'
  }),
  [FluidName.SIMIK_BLOOD]: new Fluid({
    name: FluidName.SIMIK_BLOOD,
    display: 'Simik blood',
    icon: 'simik-blood'
  }),
  [FluidName.ARQAD_HONEY]: new Fluid({
    name: FluidName.ARQAD_HONEY,
    display: 'Arqad honey',
    icon: 'arqad-honey'
  }),
  [FluidName.PRE_FIBER_1]: new Fluid({
    name: FluidName.PRE_FIBER_1,
    display: 'Pre Fiber 01',
    icon: 'pre-fiber-1'
  }),
  [FluidName.PRE_FIBER_2]: new Fluid({
    name: FluidName.PRE_FIBER_2,
    display: 'Pre Fiber 02',
    icon: 'pre-fiber-2'
  }),
  [FluidName.PRE_FIBER_3]: new Fluid({
    name: FluidName.PRE_FIBER_3,
    display: 'Pre Fiber 03',
    icon: 'pre-fiber-3'
  }),
  [FluidName.CREAMY_LATEX]: new Fluid({
    name: FluidName.CREAMY_LATEX,
    display: 'Creamy latex',
    icon: 'creamy-latex'
  }),
  [FluidName.FORMIC_ACID]: new Fluid({
    name: FluidName.FORMIC_ACID,
    display: 'Formic acid',
    icon: 'formic-acid'
  }),
  [FluidName.METHANE]: new Fluid({
    name: FluidName.METHANE,
    display: 'Methane',
    icon: 'methane'
  }),
  [FluidName.AMMONIA]: new Fluid({
    name: FluidName.AMMONIA,
    display: 'Ammonia',
    icon: 'ammonia'
  }),
  [FluidName.CYANIC_ACID]: new Fluid({
    name: FluidName.CYANIC_ACID,
    display: 'Cyanic acid',
    icon: 'cyanic-acid'
  }),
  [FluidName.ACETIC_ACID]: new Fluid({
    name: FluidName.ACETIC_ACID,
    display: 'Acetic acid',
    icon: 'acetic-acid'
  }),
  [FluidName.ACROLEIN]: new Fluid({
    name: FluidName.ACROLEIN,
    display: 'Acrolein',
    icon: 'acrolein'
  }),
  [FluidName.BLACK_LIQUOR]: new Fluid({
    name: FluidName.BLACK_LIQUOR,
    display: 'Black liquor',
    icon: 'black-liquor'
  }),
  [FluidName.ETHYLENE]: new Fluid({
    name: FluidName.ETHYLENE,
    display: 'Ethylene',
    icon: 'ethylene'
  }),
  [FluidName.METHANAL]: new Fluid({
    name: FluidName.METHANAL,
    display: 'Formaldehyde',
    icon: 'methanal'
  }),
  [FluidName.NITROBENZENE]: new Fluid({
    name: FluidName.NITROBENZENE,
    display: 'Nitrobenzene',
    icon: 'nitrobenzene'
  }),
  [FluidName.PROPENE]: new Fluid({
    name: FluidName.PROPENE,
    display: 'Propene',
    icon: 'propene'
  }),
  [FluidName.RAW_RALESIA_EXTRACT]: new Fluid({
    name: FluidName.RAW_RALESIA_EXTRACT,
    display: 'Raw ralesia extract',
    icon: 'raw-ralesia-extract'
  }),
  [FluidName.TALL_OIL]: new Fluid({
    name: FluidName.TALL_OIL,
    display: 'Tall oil',
    icon: 'tall-oil'
  }),
  [FluidName.BACTERIA_2]: new Fluid({
    name: FluidName.BACTERIA_2,
    display: 'Knallgas-bacteria',
    icon: 'bacteria-2'
  }),
  [FluidName.CARBON_SULFIDE]: new Fluid({
    name: FluidName.CARBON_SULFIDE,
    display: 'Carbonyl sulfide',
    icon: 'carbon-sulfide'
  }),
  [FluidName.CHLOROMETHANE]: new Fluid({
    name: FluidName.CHLOROMETHANE,
    display: 'Chloromethane',
    icon: 'chloromethane'
  }),
  [FluidName.CUMENE]: new Fluid({
    name: FluidName.CUMENE,
    display: 'Cumene',
    icon: 'cumene'
  }),
  [FluidName.DIMETHYLDICHLOROSILANE]: new Fluid({
    name: FluidName.DIMETHYLDICHLOROSILANE,
    display: 'Dimethyldichlorosilane',
    icon: 'dimethyldichlorosilane'
  }),
  [FluidName.ECH]: new Fluid({
    name: FluidName.ECH,
    display: 'Epichlorohydrin (ECH)',
    icon: 'ech'
  }),
  [FluidName.ETCHING]: new Fluid({
    name: FluidName.ETCHING,
    display: 'Etching solution',
    icon: 'etching'
  }),
  [FluidName.MSA]: new Fluid({
    name: FluidName.MSA,
    display: 'Methanesulfonic acid (MSA)',
    icon: 'msa'
  }),
  [FluidName.PHOSPHORIC_ACID]: new Fluid({
    name: FluidName.PHOSPHORIC_ACID,
    display: 'Phosphoric acid',
    icon: 'phosphoric-acid'
  }),
  [FluidName.PHOSPHOROUS_ACID]: new Fluid({
    name: FluidName.PHOSPHOROUS_ACID,
    display: 'Phosphorous acid',
    icon: 'phosphorous-acid'
  }),
  [FluidName.RALESIA_EXTRACT]: new Fluid({
    name: FluidName.RALESIA_EXTRACT,
    display: 'Ralesia extract',
    icon: 'ralesia-extract'
  }),
  [FluidName.ACETONE]: new Fluid({
    name: FluidName.ACETONE,
    display: 'Acetone',
    icon: 'acetone'
  }),
  [FluidName.BENZENE]: new Fluid({
    name: FluidName.BENZENE,
    display: 'Benzene',
    icon: 'benzene'
  }),
  [FluidName.PHOSPHINE_GAS]: new Fluid({
    name: FluidName.PHOSPHINE_GAS,
    display: 'Phosphine gas',
    icon: 'phosphine-gas'
  }),
  [FluidName.SOAKED_GEL]: new Fluid({
    name: FluidName.SOAKED_GEL,
    display: 'Soaked gel',
    icon: 'soaked-gel'
  }),
  [FluidName.ANTHRACENE_OIL]: new Fluid({
    name: FluidName.ANTHRACENE_OIL,
    display: 'Anthracene oil',
    icon: 'anthracene-oil'
  }),
  [FluidName.BITUMEN]: new Fluid({
    name: FluidName.BITUMEN,
    display: 'Bitumen',
    icon: 'bitumen'
  }),
  [FluidName.BITUMEN_FROTH]: new Fluid({
    name: FluidName.BITUMEN_FROTH,
    display: 'Bitumen froth',
    icon: 'bitumen-froth'
  }),
  [FluidName.BTX]: new Fluid({
    name: FluidName.BTX,
    display: 'BTX',
    icon: 'btx'
  }),
  [FluidName.CARBOLIC_OIL]: new Fluid({
    name: FluidName.CARBOLIC_OIL,
    display: 'Carbolic oil',
    icon: 'carbolic-oil'
  }),
  [FluidName.CHLOROETHANOL]: new Fluid({
    name: FluidName.CHLOROETHANOL,
    display: 'Chloroethanol',
    icon: 'chloroethanol'
  }),
  [FluidName.COALBED_GAS]: new Fluid({
    name: FluidName.COALBED_GAS,
    display: 'Coalbed gas',
    icon: 'coalbed-gas'
  }),
  [FluidName.CONDENSATES]: new Fluid({
    name: FluidName.CONDENSATES,
    display: 'Condensates',
    icon: 'condensates'
  }),
  [FluidName.CONDENSED_DISTILLATE]: new Fluid({
    name: FluidName.CONDENSED_DISTILLATE,
    display: 'Condensed distillates',
    icon: 'condensed-distillate'
  }),
  [FluidName.DIRTY_SYNGAS]: new Fluid({
    name: FluidName.DIRTY_SYNGAS,
    display: 'Dirty syngas',
    icon: 'dirty-syngas'
  }),
  [FluidName.ETHYLENE_CHLOROHYDRIN]: new Fluid({
    name: FluidName.ETHYLENE_CHLOROHYDRIN,
    display: 'Ethylene chlorohydrin',
    icon: 'ethylene-chlorohydrin'
  }),
  [FluidName.ETHYLENE_GLYCOL]: new Fluid({
    name: FluidName.ETHYLENE_GLYCOL,
    display: 'Ethylene glycol',
    icon: 'ethylene-glycol'
  }),
  [FluidName.FUEL_OIL]: new Fluid({
    name: FluidName.FUEL_OIL,
    display: 'Fuel oil',
    icon: 'fuel-oil'
  }),
  [FluidName.HIGH_DISTILLATE]: new Fluid({
    name: FluidName.HIGH_DISTILLATE,
    display: 'High distillates',
    icon: 'high-distillate'
  }),
  [FluidName.HOT_AIR]: new Fluid({
    name: FluidName.HOT_AIR,
    display: 'Hot air',
    icon: 'hot-air'
  }),
  [FluidName.HOT_REACTION_GAS]: new Fluid({
    name: FluidName.HOT_REACTION_GAS,
    display: 'Hot reaction gas',
    icon: 'dirty-reaction'
  }),
  [FluidName.HOT_RESIDUAL_MIXTURE]: new Fluid({
    name: FluidName.HOT_RESIDUAL_MIXTURE,
    display: 'Coking gas oil',
    icon: 'hot-residual-mixture'
  }),
  [FluidName.HOT_SYNGAS]: new Fluid({
    name: FluidName.HOT_SYNGAS,
    display: 'Hot syngas',
    icon: 'hot-syngas'
  }),
  [FluidName.LOW_DISTILLATE]: new Fluid({
    name: FluidName.LOW_DISTILLATE,
    display: 'Low distillates',
    icon: 'low-distillate'
  }),
  [FluidName.MEDIUM_DISTILLATE]: new Fluid({
    name: FluidName.MEDIUM_DISTILLATE,
    display: 'Medium distillates',
    icon: 'medium-distillate'
  }),
  [FluidName.MIDDLE_OIL]: new Fluid({
    name: FluidName.MIDDLE_OIL,
    display: 'Middle oil',
    icon: 'middle-oil'
  }),
  [FluidName.NAPHTHA]: new Fluid({
    name: FluidName.NAPHTHA,
    display: 'Naphtha',
    icon: 'naphtha'
  }),
  [FluidName.NAPHTHALENE_OIL]: new Fluid({
    name: FluidName.NAPHTHALENE_OIL,
    display: 'Naphthalene oil',
    icon: 'naphthalene-oil'
  }),
  [FluidName.NATURAL_GAS]: new Fluid({
    name: FluidName.NATURAL_GAS,
    display: 'Natural gas',
    icon: 'natural-gas'
  }),
  [FluidName.OIL_SAND_SLURRY]: new Fluid({
    name: FluidName.OIL_SAND_SLURRY,
    display: 'Oil sand slurry',
    icon: 'oil-sand-slurry'
  }),
  [FluidName.PITCH]: new Fluid({
    name: FluidName.PITCH,
    display: 'Pitch',
    icon: 'pitch'
  }),
  [FluidName.POLYBUTADIENE]: new Fluid({
    name: FluidName.POLYBUTADIENE,
    display: 'Polybutadiene',
    icon: 'polybutadiene'
  }),
  [FluidName.PRESSURED_HYDROGEN]: new Fluid({
    name: FluidName.PRESSURED_HYDROGEN,
    display: 'Pressurized hydrogen',
    icon: 'pressured-hydrogen'
  }),
  [FluidName.PROCESSED_LIGHT_OIL]: new Fluid({
    name: FluidName.PROCESSED_LIGHT_OIL,
    display: 'Processed light oil',
    icon: 'processed-light-oil-canister'
  }),
  [FluidName.PROTO_THOLINS]: new Fluid({
    name: FluidName.PROTO_THOLINS,
    display: 'Proto tholins',
    icon: 'proto-tholins'
  }),
  [FluidName.PURE_NATURAL_GAS]: new Fluid({
    name: FluidName.PURE_NATURAL_GAS,
    display: 'Pure natural gas',
    icon: 'pure-natural-gas'
  }),
  [FluidName.PURIFIED_NATURAL_GAS]: new Fluid({
    name: FluidName.PURIFIED_NATURAL_GAS,
    display: 'Purified natural gas',
    icon: 'purified-natural-gas'
  }),
  [FluidName.PURIFIED_SYNGAS]: new Fluid({
    name: FluidName.PURIFIED_SYNGAS,
    display: 'Purified syngas',
    icon: 'purified-syngas'
  }),
  [FluidName.RAW_GAS]: new Fluid({
    name: FluidName.RAW_GAS,
    display: 'Raw gas',
    icon: 'raw-gas'
  }),
  [FluidName.REFINED_NATURAL_GAS]: new Fluid({
    name: FluidName.REFINED_NATURAL_GAS,
    display: 'Refined natural gas',
    icon: 'empty-refined-natural-gas-barrel'
  }),
  [FluidName.RESIDUAL_GAS]: new Fluid({
    name: FluidName.RESIDUAL_GAS,
    display: 'Residual gas',
    icon: 'residual-gas'
  }),
  [FluidName.RESIDUAL_MIXTURE]: new Fluid({
    name: FluidName.RESIDUAL_MIXTURE,
    display: 'Residual mixture',
    icon: 'residual-mixture'
  }),
  [FluidName.RESIDUAL_OIL]: new Fluid({
    name: FluidName.RESIDUAL_OIL,
    display: 'Residual oil',
    icon: 'residual-oil'
  }),
  [FluidName.SCRUDE]: new Fluid({
    name: FluidName.SCRUDE,
    display: 'Shale oil',
    icon: 'scrude'
  }),
  [FluidName.STRIPPED_DISTILLATE]: new Fluid({
    name: FluidName.STRIPPED_DISTILLATE,
    display: 'Stripped distillates',
    icon: 'stripped-distillate'
  }),
  [FluidName.STYRENE]: new Fluid({
    name: FluidName.STYRENE,
    display: 'Styrene',
    icon: 'styrene'
  }),
  [FluidName.THOLINS]: new Fluid({
    name: FluidName.THOLINS,
    display: 'Tholins',
    icon: 'tholins'
  }),
  [FluidName.DRILLING_FLUID_0]: new Fluid({
    name: FluidName.DRILLING_FLUID_0,
    display: 'Drilling fluid (type 1)',
    icon: 'drilling-fluid-0'
  }),
  [FluidName.DRILLING_FLUID_1]: new Fluid({
    name: FluidName.DRILLING_FLUID_1,
    display: 'Drilling fluid (type 2)',
    icon: 'drilling-fluid-1'
  }),
  [FluidName.DRILLING_FLUID_2]: new Fluid({
    name: FluidName.DRILLING_FLUID_2,
    display: 'Drilling fluid (type 3)',
    icon: 'drilling-fluid-2'
  }),
  [FluidName.DRILLING_FLUID_3]: new Fluid({
    name: FluidName.DRILLING_FLUID_3,
    display: 'Drilling fluid (type 4)',
    icon: 'drilling-fluid-3'
  }),
  [FluidName.LUBRICANT]: new Fluid({
    name: FluidName.LUBRICANT,
    display: 'Lubricant',
    icon: 'lubricant'
  }),
  [FluidName.MOLTEN_STAINLESS_STEEL]: new Fluid({
    name: FluidName.MOLTEN_STAINLESS_STEEL,
    display: 'Molten stainless steel',
    icon: 'molten-stainless-steel'
  }),
  [FluidName.MOLTEN_STAINLESS_STEEL_P1]: new Fluid({
    name: FluidName.MOLTEN_STAINLESS_STEEL_P1,
    display: 'Molten stainless steel alloy mix 1',
    icon: 'molten-stainless-steel-p1'
  }),
  [FluidName.MOLTEN_STAINLESS_STEEL_P2]: new Fluid({
    name: FluidName.MOLTEN_STAINLESS_STEEL_P2,
    display: 'Molten stainless steel alloy mix 2',
    icon: 'molten-stainless-steel-p2'
  }),
  [FluidName.MOLTEN_STAINLESS_STEEL_P3]: new Fluid({
    name: FluidName.MOLTEN_STAINLESS_STEEL_P3,
    display: 'Molten stainless steel alloy mix 3',
    icon: 'molten-stainless-steel-p3'
  }),
  [FluidName.MOLTEN_STEEL]: new Fluid({
    name: FluidName.MOLTEN_STEEL,
    display: 'Molten steel',
    icon: 'molten-steel'
  }),
  [FluidName.MOLTEN_SUPER_STEEL]: new Fluid({
    name: FluidName.MOLTEN_SUPER_STEEL,
    display: 'Molten super steel',
    icon: 'molten-super-steel'
  }),
  [FluidName.MOLTEN_SUPER_STEEL_P1]: new Fluid({
    name: FluidName.MOLTEN_SUPER_STEEL_P1,
    display: 'Molten super steel alloy mix 1',
    icon: 'molten-super-steel-p1'
  }),
  [FluidName.MOLTEN_SUPER_STEEL_P2]: new Fluid({
    name: FluidName.MOLTEN_SUPER_STEEL_P2,
    display: 'Molten super steel alloy mix 2',
    icon: 'molten-super-steel-p2'
  }),
  [FluidName.AL_PULP_01]: new Fluid({
    name: FluidName.AL_PULP_01,
    display: 'Aluminium pulp (stage 1)',
    icon: 'al-pulp-01'
  }),
  [FluidName.MOLTEN_ALUMINIUM]: new Fluid({
    name: FluidName.MOLTEN_ALUMINIUM,
    display: 'Molten aluminium',
    icon: 'molten-aluminium'
  }),
  [FluidName.AL_PULP_02]: new Fluid({
    name: FluidName.AL_PULP_02,
    display: 'Aluminium pulp (stage 2)',
    icon: 'al-pulp-02'
  }),
  [FluidName.AL_PULP_03]: new Fluid({
    name: FluidName.AL_PULP_03,
    display: 'Aluminium pulp (stage 3)',
    icon: 'al-pulp-03'
  }),
  [FluidName.AL_PULP_04]: new Fluid({
    name: FluidName.AL_PULP_04,
    display: 'Aluminium pulp (stage 4)',
    icon: 'al-pulp-04'
  }),
  [FluidName.CHROMITE_CONCENTRATE]: new Fluid({
    name: FluidName.CHROMITE_CONCENTRATE,
    display: 'Chromite concentrate',
    icon: 'chromite-concentrate'
  }),
  [FluidName.CHROMITE_FINES]: new Fluid({
    name: FluidName.CHROMITE_FINES,
    display: 'Chromite fines',
    icon: 'chromite-fines'
  }),
  [FluidName.CHROMITE_MIX]: new Fluid({
    name: FluidName.CHROMITE_MIX,
    display: 'Chromite mix',
    icon: 'chromite-mix'
  }),
  [FluidName.CHROMITE_PULP_01]: new Fluid({
    name: FluidName.CHROMITE_PULP_01,
    display: 'Chromite pulp (stage 1)',
    icon: 'chromite-pulp-01'
  }),
  [FluidName.CHROMITE_PULP_02]: new Fluid({
    name: FluidName.CHROMITE_PULP_02,
    display: 'Chromite pulp (stage 2)',
    icon: 'chromite-pulp-02'
  }),
  [FluidName.CHROMITE_PULP_03]: new Fluid({
    name: FluidName.CHROMITE_PULP_03,
    display: 'Chromite pulp (stage 3)',
    icon: 'chromite-pulp-03'
  }),
  [FluidName.CHROMITE_PULP_04]: new Fluid({
    name: FluidName.CHROMITE_PULP_04,
    display: 'Chromite pulp (stage 4)',
    icon: 'chromite-pulp-04'
  }),
  [FluidName.CHROMITE_PULP_05]: new Fluid({
    name: FluidName.CHROMITE_PULP_05,
    display: 'Chromite pulp (stage 5)',
    icon: 'chromite-pulp-05'
  }),
  [FluidName.CHROMITE_PULP_06]: new Fluid({
    name: FluidName.CHROMITE_PULP_06,
    display: 'Chromite pulp (stage 6)',
    icon: 'chromite-pulp-06'
  }),
  [FluidName.CHROMITE_PULP_07]: new Fluid({
    name: FluidName.CHROMITE_PULP_07,
    display: 'Chromite pulp (stage 7)',
    icon: 'chromite-pulp-07'
  }),
  [FluidName.CHROMITE_SOLUTION]: new Fluid({
    name: FluidName.CHROMITE_SOLUTION,
    display: 'Chromite solution',
    icon: 'chromite-solution'
  }),
  [FluidName.CHROMIUM_REJECTS]: new Fluid({
    name: FluidName.CHROMIUM_REJECTS,
    display: 'Chromium rejects',
    icon: 'chromium-rejects'
  }),
  [FluidName.MOLTEN_CHROMIUM]: new Fluid({
    name: FluidName.MOLTEN_CHROMIUM,
    display: 'Molten chromium',
    icon: 'molten-chromium'
  }),
  [FluidName.PREPARED_CHROMIUM]: new Fluid({
    name: FluidName.PREPARED_CHROMIUM,
    display: 'Prepared chromium',
    icon: 'prepared-chromium'
  }),
  [FluidName.COAL_FINES]: new Fluid({
    name: FluidName.COAL_FINES,
    display: 'Coal fines',
    icon: 'coal-fines'
  }),
  [FluidName.COAL_PULP_01]: new Fluid({
    name: FluidName.COAL_PULP_01,
    display: 'Coal pulp (stage 1)',
    icon: 'coal-pulp-01'
  }),
  [FluidName.COAL_PULP_02]: new Fluid({
    name: FluidName.COAL_PULP_02,
    display: 'Coal pulp (stage 2)',
    icon: 'coal-pulp-02'
  }),
  [FluidName.COAL_PULP_03]: new Fluid({
    name: FluidName.COAL_PULP_03,
    display: 'Coal pulp (stage 3)',
    icon: 'coal-pulp-03'
  }),
  [FluidName.COAL_PULP_04]: new Fluid({
    name: FluidName.COAL_PULP_04,
    display: 'Coal pulp (stage 4)',
    icon: 'coal-pulp-04'
  }),
  [FluidName.COAL_PULP_05]: new Fluid({
    name: FluidName.COAL_PULP_05,
    display: 'Coal pulp (stage 5)',
    icon: 'coal-pulp-05'
  }),
  [FluidName.COAL_SLIME_OVERFLOW]: new Fluid({
    name: FluidName.COAL_SLIME_OVERFLOW,
    display: 'Coal slime overflow',
    icon: 'coal-slime-overflow'
  }),
  [FluidName.COAL_UNDER_PULP]: new Fluid({
    name: FluidName.COAL_UNDER_PULP,
    display: 'Coal underflow pulp',
    icon: 'coal-under-pulp'
  }),
  [FluidName.CONDITIONED_FINES]: new Fluid({
    name: FluidName.CONDITIONED_FINES,
    display: 'Conditioned coal fines',
    icon: 'conditioned-fines'
  }),
  [FluidName.FINES_PULP]: new Fluid({
    name: FluidName.FINES_PULP,
    display: 'Coal fines pulp',
    icon: 'fines-pulp'
  }),
  [FluidName.HIGH_ASH_FINES]: new Fluid({
    name: FluidName.HIGH_ASH_FINES,
    display: 'High ash coal fines',
    icon: 'high-ash-fines'
  }),
  [FluidName.THICKENED_COAL_FINES]: new Fluid({
    name: FluidName.THICKENED_COAL_FINES,
    display: 'Thickened coal fines',
    icon: 'thickened-coal-fines'
  }),
  [FluidName.COKE_OVEN_GAS]: new Fluid({
    name: FluidName.COKE_OVEN_GAS,
    display: 'Coke oven gas',
    icon: 'coke-oven-gas'
  }),
  [FluidName.OUTLET_GAS_01]: new Fluid({
    name: FluidName.OUTLET_GAS_01,
    display: 'Outlet gas (stage 1)',
    icon: 'outlet-gas-01'
  }),
  [FluidName.OUTLET_GAS_02]: new Fluid({
    name: FluidName.OUTLET_GAS_02,
    display: 'Outlet gas (stage 2)',
    icon: 'outlet-gas-02'
  }),
  [FluidName.OUTLET_GAS_03]: new Fluid({
    name: FluidName.OUTLET_GAS_03,
    display: 'Outlet gas (stage 3)',
    icon: 'outlet-gas-03'
  }),
  [FluidName.OUTLET_GAS_04]: new Fluid({
    name: FluidName.OUTLET_GAS_04,
    display: 'Outlet gas (stage 4)',
    icon: 'outlet-gas-04'
  }),
  [FluidName.COPPER_PREGNANT_SOLUTION]: new Fluid({
    name: FluidName.COPPER_PREGNANT_SOLUTION,
    display: 'Copper pregnant leach solution',
    icon: 'copper-pregnant-solution'
  }),
  [FluidName.COPPER_PULP_01]: new Fluid({
    name: FluidName.COPPER_PULP_01,
    display: 'Copper pulp (stage 1)',
    icon: 'copper-pulp-01'
  }),
  [FluidName.COPPER_PULP_02]: new Fluid({
    name: FluidName.COPPER_PULP_02,
    display: 'Copper pulp (stage 2)',
    icon: 'copper-pulp-02'
  }),
  [FluidName.COPPER_PULP_03]: new Fluid({
    name: FluidName.COPPER_PULP_03,
    display: 'Copper pulp (stage 3)',
    icon: 'copper-pulp-03'
  }),
  [FluidName.COPPER_PULP_04]: new Fluid({
    name: FluidName.COPPER_PULP_04,
    display: 'Copper pulp (stage 4)',
    icon: 'copper-pulp-04'
  }),
  [FluidName.COPPER_SOLUTION]: new Fluid({
    name: FluidName.COPPER_SOLUTION,
    display: 'Copper solution',
    icon: 'copper-solution'
  }),
  [FluidName.MOLTEN_COPPER]: new Fluid({
    name: FluidName.MOLTEN_COPPER,
    display: 'Molten copper',
    icon: 'molten-copper'
  }),
  [FluidName.IRON_PULP_01]: new Fluid({
    name: FluidName.IRON_PULP_01,
    display: 'Iron pulp (stage 1)',
    icon: 'iron-pulp-01'
  }),
  [FluidName.IRON_PULP_02]: new Fluid({
    name: FluidName.IRON_PULP_02,
    display: 'Iron pulp (stage 2)',
    icon: 'iron-pulp-02'
  }),
  [FluidName.IRON_PULP_03]: new Fluid({
    name: FluidName.IRON_PULP_03,
    display: 'Iron pulp (stage 3)',
    icon: 'iron-pulp-03'
  }),
  [FluidName.IRON_PULP_04]: new Fluid({
    name: FluidName.IRON_PULP_04,
    display: 'Iron pulp (stage 4)',
    icon: 'iron-pulp-04'
  }),
  [FluidName.IRON_PULP_05]: new Fluid({
    name: FluidName.IRON_PULP_05,
    display: 'Iron pulp (stage 5)',
    icon: 'iron-pulp-05'
  }),
  [FluidName.IRON_PULP_06]: new Fluid({
    name: FluidName.IRON_PULP_06,
    display: 'Iron pulp (stage 6)',
    icon: 'iron-pulp-06'
  }),
  [FluidName.IRON_PULP_07]: new Fluid({
    name: FluidName.IRON_PULP_07,
    display: 'Iron pulp (stage 7)',
    icon: 'iron-pulp-07'
  }),
  [FluidName.IRON_SLIME]: new Fluid({
    name: FluidName.IRON_SLIME,
    display: 'Iron slime',
    icon: 'iron-slime'
  }),
  [FluidName.MOLTEN_IRON]: new Fluid({
    name: FluidName.MOLTEN_IRON,
    display: 'Molten iron',
    icon: 'molten-iron'
  }),
  [FluidName.MOLTEN_LEAD]: new Fluid({
    name: FluidName.MOLTEN_LEAD,
    display: 'Molten lead',
    icon: 'molten-lead'
  }),
  [FluidName.SL_01]: new Fluid({
    name: FluidName.SL_01,
    display: 'Silver lead solution (stage 1)',
    icon: 'sl-01'
  }),
  [FluidName.SL_02]: new Fluid({
    name: FluidName.SL_02,
    display: 'Silver lead solution (stage 2)',
    icon: 'sl-02'
  }),
  [FluidName.SL_03]: new Fluid({
    name: FluidName.SL_03,
    display: 'Silver lead solution (stage 3)',
    icon: 'sl-03'
  }),
  [FluidName.SLZ_PULP_01]: new Fluid({
    name: FluidName.SLZ_PULP_01,
    display: 'Silver lead zinc pulp (stage 1)',
    icon: 'slz-pulp-01'
  }),
  [FluidName.SLZ_PULP_02]: new Fluid({
    name: FluidName.SLZ_PULP_02,
    display: 'Silver lead zinc pulp (stage 2)',
    icon: 'slz-pulp-02'
  }),
  [FluidName.MOLTEN_NEXELIT]: new Fluid({
    name: FluidName.MOLTEN_NEXELIT,
    display: 'Molten nexelit',
    icon: 'molten-nexelit'
  }),
  [FluidName.NEXELIT_PULP_01]: new Fluid({
    name: FluidName.NEXELIT_PULP_01,
    display: 'Nexelit pulp (stage 1)',
    icon: 'nexelit-pulp-01'
  }),
  [FluidName.NEXELIT_PULP_02]: new Fluid({
    name: FluidName.NEXELIT_PULP_02,
    display: 'Nexelit pulp (stage 2)',
    icon: 'nexelit-pulp-02'
  }),
  [FluidName.NEXELIT_PULP_03]: new Fluid({
    name: FluidName.NEXELIT_PULP_03,
    display: 'Nexelit pulp (stage 3)',
    icon: 'nexelit-pulp-03'
  }),
  [FluidName.NEXELIT_PULP_04]: new Fluid({
    name: FluidName.NEXELIT_PULP_04,
    display: 'Nexelit pulp (stage 4)',
    icon: 'nexelit-pulp-04'
  }),
  [FluidName.NEXELIT_REFINED_PULP]: new Fluid({
    name: FluidName.NEXELIT_REFINED_PULP,
    display: 'Refined nexelit pulp',
    icon: 'nexelit-refined-pulp'
  }),
  [FluidName.NEXELIT_SLURRY]: new Fluid({
    name: FluidName.NEXELIT_SLURRY,
    display: 'Nexelit slurry',
    icon: 'nexelit-slurry'
  }),
  [FluidName.MOLTEN_NICKEL]: new Fluid({
    name: FluidName.MOLTEN_NICKEL,
    display: 'Molten nickel',
    icon: 'molten-nickel'
  }),
  [FluidName.NICKEL_OVERFLOW]: new Fluid({
    name: FluidName.NICKEL_OVERFLOW,
    display: 'Nickel overflow',
    icon: 'nickel-overflow'
  }),
  [FluidName.NICKEL_PREPARED_SOLUTION]: new Fluid({
    name: FluidName.NICKEL_PREPARED_SOLUTION,
    display: 'Prepared nickel solution',
    icon: 'nickel-prepared-solution'
  }),
  [FluidName.NICKEL_PULP_01]: new Fluid({
    name: FluidName.NICKEL_PULP_01,
    display: 'Nickel pulp (stage 1)',
    icon: 'nickel-pulp-01'
  }),
  [FluidName.NICKEL_PULP_02]: new Fluid({
    name: FluidName.NICKEL_PULP_02,
    display: 'Nickel pulp (stage 2)',
    icon: 'nickel-pulp-02'
  }),
  [FluidName.NICKEL_PULP_03]: new Fluid({
    name: FluidName.NICKEL_PULP_03,
    display: 'Nickel pulp (stage 3)',
    icon: 'nickel-pulp-03'
  }),
  [FluidName.NICKEL_PULP_04]: new Fluid({
    name: FluidName.NICKEL_PULP_04,
    display: 'Nickel pulp (stage 4)',
    icon: 'nickel-pulp-04'
  }),
  [FluidName.NICKEL_SLIME]: new Fluid({
    name: FluidName.NICKEL_SLIME,
    display: 'Nickel slime',
    icon: 'nickel-slime'
  }),
  [FluidName.NICKEL_TAILINGS]: new Fluid({
    name: FluidName.NICKEL_TAILINGS,
    display: 'Nickel tailings',
    icon: 'nickel-tailings'
  }),
  [FluidName.PREPARED_NICKEL_PULP]: new Fluid({
    name: FluidName.PREPARED_NICKEL_PULP,
    display: 'Prepared nickel pulp',
    icon: 'prepared-nickel-pulp'
  }),
  [FluidName.HIGH_GRADE_QUARTZ_PULP]: new Fluid({
    name: FluidName.HIGH_GRADE_QUARTZ_PULP,
    display: 'High grade quartz pulp',
    icon: 'high-grade-quartz-pulp'
  }),
  [FluidName.MOLTEN_GLASS]: new Fluid({
    name: FluidName.MOLTEN_GLASS,
    display: 'Molten glass',
    icon: 'molten-glass'
  }),
  [FluidName.PREPARED_QUARTZ]: new Fluid({
    name: FluidName.PREPARED_QUARTZ,
    display: 'Prepared quartz',
    icon: 'prepared-quartz'
  }),
  [FluidName.QUARTZ_PULP_01]: new Fluid({
    name: FluidName.QUARTZ_PULP_01,
    display: 'Quartz pulp (stage 1)',
    icon: 'quartz-pulp-01'
  }),
  [FluidName.QUARTZ_PULP_02]: new Fluid({
    name: FluidName.QUARTZ_PULP_02,
    display: 'Quartz pulp (stage 2)',
    icon: 'quartz-pulp-02'
  }),
  [FluidName.MOLTEN_TIN]: new Fluid({
    name: FluidName.MOLTEN_TIN,
    display: 'Molten tin',
    icon: 'molten-tin'
  }),
  [FluidName.TIN_BOTTOM_PULP]: new Fluid({
    name: FluidName.TIN_BOTTOM_PULP,
    display: 'Bottom tin pulp',
    icon: 'tin-bottom-pulp'
  }),
  [FluidName.TIN_MIDDLE_PULP]: new Fluid({
    name: FluidName.TIN_MIDDLE_PULP,
    display: 'Middle tin pulp',
    icon: 'tin-middle-pulp'
  }),
  [FluidName.TIN_PULP_01]: new Fluid({
    name: FluidName.TIN_PULP_01,
    display: 'Tin pulp (stage 1)',
    icon: 'tin-pulp-01'
  }),
  [FluidName.TIN_PULP_02]: new Fluid({
    name: FluidName.TIN_PULP_02,
    display: 'Tin pulp (stage 2)',
    icon: 'tin-pulp-02'
  }),
  [FluidName.TIN_PULP_03]: new Fluid({
    name: FluidName.TIN_PULP_03,
    display: 'Tin pulp (stage 3)',
    icon: 'tin-pulp-03'
  }),
  [FluidName.TIN_SLIME]: new Fluid({
    name: FluidName.TIN_SLIME,
    display: 'Tin slime',
    icon: 'tin-slime'
  }),
  [FluidName.TIN_SLIME_OVERFLOW]: new Fluid({
    name: FluidName.TIN_SLIME_OVERFLOW,
    display: 'Tin slime overflow',
    icon: 'tin-slime-overflow'
  }),
  [FluidName.TIN_SOLUTION]: new Fluid({
    name: FluidName.TIN_SOLUTION,
    display: 'Tin solution',
    icon: 'tin-solution'
  }),
  [FluidName.MOLTEN_TITANIUM]: new Fluid({
    name: FluidName.MOLTEN_TITANIUM,
    display: 'Molten titanium',
    icon: 'molten-titanium'
  }),
  [FluidName.PURIFIED_TI_PULP]: new Fluid({
    name: FluidName.PURIFIED_TI_PULP,
    display: 'Purified titanium pulp',
    icon: 'purified-ti-pulp'
  }),
  [FluidName.TI_OVERFLOW_WASTE]: new Fluid({
    name: FluidName.TI_OVERFLOW_WASTE,
    display: 'Titanium overflow waste',
    icon: 'ti-overflow-waste'
  }),
  [FluidName.TI_PULP_01]: new Fluid({
    name: FluidName.TI_PULP_01,
    display: 'Titanium pulp (stage 1)',
    icon: 'ti-pulp-01'
  }),
  [FluidName.TI_PULP_02]: new Fluid({
    name: FluidName.TI_PULP_02,
    display: 'Titanium pulp (stage 2)',
    icon: 'ti-pulp-02'
  }),
  [FluidName.TI_PULP_03]: new Fluid({
    name: FluidName.TI_PULP_03,
    display: 'Titanium pulp (stage 3)',
    icon: 'ti-pulp-03'
  }),
  [FluidName.TI_PULP_04]: new Fluid({
    name: FluidName.TI_PULP_04,
    display: 'Titanium pulp (stage 4)',
    icon: 'ti-pulp-04'
  }),
  [FluidName.TI_PULP_05]: new Fluid({
    name: FluidName.TI_PULP_05,
    display: 'Titanium pulp (stage 5)',
    icon: 'ti-pulp-05'
  }),
  [FluidName.TI_PULP_06]: new Fluid({
    name: FluidName.TI_PULP_06,
    display: 'Titanium pulp (stage 6)',
    icon: 'ti-pulp-06'
  }),
  [FluidName.TI_SOLUTION]: new Fluid({
    name: FluidName.TI_SOLUTION,
    display: 'Titanium solution (stage 1)',
    icon: 'ti-solution'
  }),
  [FluidName.TI_SOLUTION_02]: new Fluid({
    name: FluidName.TI_SOLUTION_02,
    display: 'Titanium solution (stage 2)',
    icon: 'ti-solution-02'
  }),
  [FluidName.U_PULP_01]: new Fluid({
    name: FluidName.U_PULP_01,
    display: 'Uranium pulp (stage 1)',
    icon: 'u-pulp-01'
  }),
  [FluidName.U_PULP_02]: new Fluid({
    name: FluidName.U_PULP_02,
    display: 'Uranium pulp (stage 2)',
    icon: 'u-pulp-02'
  }),
  [FluidName.U_PULP_03]: new Fluid({
    name: FluidName.U_PULP_03,
    display: 'Uranium pulp (stage 3)',
    icon: 'u-pulp-03'
  }),
  [FluidName.MOLTEN_ZINC]: new Fluid({
    name: FluidName.MOLTEN_ZINC,
    display: 'Molten zinc',
    icon: 'molten-zinc'
  }),
  [FluidName.ZINC_OVERFLOW]: new Fluid({
    name: FluidName.ZINC_OVERFLOW,
    display: 'Zinc overflow',
    icon: 'zinc-overflow'
  }),
  [FluidName.ZINC_PULP_01]: new Fluid({
    name: FluidName.ZINC_PULP_01,
    display: 'Zinc pulp (stage 1)',
    icon: 'zinc-pulp-01'
  }),
  [FluidName.ZINC_PULP_02]: new Fluid({
    name: FluidName.ZINC_PULP_02,
    display: 'Zinc pulp (stage 2)',
    icon: 'zinc-pulp-02'
  }),
  [FluidName.ZINC_PULP_03]: new Fluid({
    name: FluidName.ZINC_PULP_03,
    display: 'Zinc pulp (stage 3)',
    icon: 'zinc-pulp-03'
  }),
  [FluidName.ZINC_PULP_04]: new Fluid({
    name: FluidName.ZINC_PULP_04,
    display: 'Zinc pulp (stage 4)',
    icon: 'zinc-pulp-04'
  }),
  [FluidName.ZINC_WASTE]: new Fluid({
    name: FluidName.ZINC_WASTE,
    display: 'Zinc waste',
    icon: 'zinc-waste'
  }),
  [FluidName.MOLTEN_SILVER]: new Fluid({
    name: FluidName.MOLTEN_SILVER,
    display: 'Molten silver',
    icon: 'empty-molten-stainless-steel-barrel'
  }),
  [FluidName.GOLD_SOLUTION]: new Fluid({
    name: FluidName.GOLD_SOLUTION,
    display: 'Gold solution',
    icon: 'gold-solution'
  }),
  [FluidName.DOWFROTH_250]: new Fluid({
    name: FluidName.DOWFROTH_250,
    display: 'Dowfroth 250',
    icon: 'dowfroth-250'
  }),
  [FluidName.SB_11_CONC]: new Fluid({
    name: FluidName.SB_11_CONC,
    display: 'Antimony 11% Concentrate',
    icon: 'sb-11-conc'
  }),
  [FluidName.SB_58_CONC]: new Fluid({
    name: FluidName.SB_58_CONC,
    display: 'Antimony 58.3% Concentrate',
    icon: 'sb-58-conc'
  }),
  [FluidName.SB_CONC]: new Fluid({
    name: FluidName.SB_CONC,
    display: 'Antimony Concentrate',
    icon: 'sb-conc'
  }),
  [FluidName.SB_FINAL_CONC]: new Fluid({
    name: FluidName.SB_FINAL_CONC,
    display: 'Final Concentrate',
    icon: 'sb-final-conc'
  }),
  [FluidName.SB_LOW_CONC]: new Fluid({
    name: FluidName.SB_LOW_CONC,
    display: 'Antimony Low Concentrate',
    icon: 'sb-low-conc'
  }),
  [FluidName.SB_PULP_01]: new Fluid({
    name: FluidName.SB_PULP_01,
    display: 'Antimony Pulp 01',
    icon: 'sb-pulp-01'
  }),
  [FluidName.SB_PULP_02]: new Fluid({
    name: FluidName.SB_PULP_02,
    display: 'Antimony Pulp 02',
    icon: 'sb-pulp-02'
  }),
  [FluidName.SB_PULP_03]: new Fluid({
    name: FluidName.SB_PULP_03,
    display: 'Antimony Pulp 03',
    icon: 'sb-pulp-03'
  }),
  [FluidName.SB_PULP_04]: new Fluid({
    name: FluidName.SB_PULP_04,
    display: 'Antimony Pulp 04',
    icon: 'sb-pulp-04'
  }),
  [FluidName.SB_PULP_05]: new Fluid({
    name: FluidName.SB_PULP_05,
    display: 'Antimony Pulp 05',
    icon: 'sb-pulp-05'
  }),
  [FluidName.NIOBIUM_COMPLEX]: new Fluid({
    name: FluidName.NIOBIUM_COMPLEX,
    display: 'Niobium complex',
    icon: 'niobium-complex'
  }),
  [FluidName.RARE_EARTH_MUD]: new Fluid({
    name: FluidName.RARE_EARTH_MUD,
    display: 'Rare earth mud',
    icon: 'rare-earth-mud'
  }),
  [FluidName.REE_SLURRY]: new Fluid({
    name: FluidName.REE_SLURRY,
    display: 'Rare earth slurry',
    icon: 'ree-slurry'
  }),
  [FluidName.REE_SOLUTION]: new Fluid({
    name: FluidName.REE_SOLUTION,
    display: 'Rare earth solution',
    icon: 'ree-solution'
  }),
  [FluidName.RE_PULP_01]: new Fluid({
    name: FluidName.RE_PULP_01,
    display: 'Rare Earth Pulp 01',
    icon: 're-pulp-01'
  }),
  [FluidName.RE_PULP_02]: new Fluid({
    name: FluidName.RE_PULP_02,
    display: 'Rare Earth Pulp 02',
    icon: 're-pulp-02'
  }),
  [FluidName.RE_PULP_03]: new Fluid({
    name: FluidName.RE_PULP_03,
    display: 'Rare Earth Pulp 03',
    icon: 're-pulp-03'
  }),
  [FluidName.RE_PULP_04]: new Fluid({
    name: FluidName.RE_PULP_04,
    display: 'Rare Earth Pulp 04',
    icon: 're-pulp-04'
  }),
  [FluidName.STRIPPED_TH]: new Fluid({
    name: FluidName.STRIPPED_TH,
    display: 'Stripped Thorium Solution',
    icon: 'stripped-th'
  }),
  [FluidName.TH_OXALATE]: new Fluid({
    name: FluidName.TH_OXALATE,
    display: 'Thorium Oxalate',
    icon: 'th-oxalate'
  }),
  [FluidName.GD_STRIPPED_SOLUTION]: new Fluid({
    name: FluidName.GD_STRIPPED_SOLUTION,
    display: 'Gadolinium Stripped Solution',
    icon: 'gd-stripped-solution'
  }),
  [FluidName.MOLTEN_SOLDER]: new Fluid({
    name: FluidName.MOLTEN_SOLDER,
    display: 'Molten solder',
    icon: 'molten-solder'
  }),
  [FluidName.ACID_SOLVENT]: new Fluid({
    name: FluidName.ACID_SOLVENT,
    display: 'Acid solvent',
    icon: 'acid-solvent'
  }),
  [FluidName.AEROFLOAT_15]: new Fluid({
    name: FluidName.AEROFLOAT_15,
    display: 'Aerofloat 15',
    icon: 'aerofloat-15'
  }),
  [FluidName.AL_TAILINGS]: new Fluid({
    name: FluidName.AL_TAILINGS,
    display: 'Aluminium tailings',
    icon: 'al-tailings'
  }),
  [FluidName.ALAMAC]: new Fluid({
    name: FluidName.ALAMAC,
    display: 'Alamac',
    icon: 'alamac'
  }),
  [FluidName.ARMAC_12]: new Fluid({
    name: FluidName.ARMAC_12,
    display: 'Armac 12-D',
    icon: 'armac-12'
  }),
  [FluidName.CHLORINE]: new Fluid({
    name: FluidName.CHLORINE,
    display: 'Chlorine',
    icon: 'chlorine'
  }),
  [FluidName.CRESYLIC_ACID]: new Fluid({
    name: FluidName.CRESYLIC_ACID,
    display: 'Cresylic acid',
    icon: 'cresylic-acid'
  }),
  [FluidName.HYDROGEN]: new Fluid({
    name: FluidName.HYDROGEN,
    display: 'Hydrogen',
    icon: 'hydrogen'
  }),
  [FluidName.HYDROGEN_CHLORIDE]: new Fluid({
    name: FluidName.HYDROGEN_CHLORIDE,
    display: 'Hydrogen chloride',
    icon: 'hydrogen-chloride'
  }),
  [FluidName.KEROSENE]: new Fluid({
    name: FluidName.KEROSENE,
    display: 'Kerosene',
    icon: 'kerosene'
  }),
  [FluidName.MIBC]: new Fluid({
    name: FluidName.MIBC,
    display: 'Methyl isobutyl carbinol (MIBC)',
    icon: 'mibc'
  }),
  [FluidName.NITROGEN]: new Fluid({
    name: FluidName.NITROGEN,
    display: 'Nitrogen',
    icon: 'nitrogen'
  }),
  [FluidName.OXYGEN]: new Fluid({
    name: FluidName.OXYGEN,
    display: 'Oxygen',
    icon: 'oxygen'
  }),
  [FluidName.PETROLEUM_SULFONATES]: new Fluid({
    name: FluidName.PETROLEUM_SULFONATES,
    display: 'Petroleum sulfonates',
    icon: 'petroleum-sulfonates'
  }),
  [FluidName.PUREST_NITROGEN_GAS]: new Fluid({
    name: FluidName.PUREST_NITROGEN_GAS,
    display: 'Purest nitrogen',
    icon: 'purest-nitrogen-gas'
  }),
  [FluidName.XYLENOL]: new Fluid({
    name: FluidName.XYLENOL,
    display: 'Xylenol',
    icon: 'xylenol'
  }),
  [FluidName.Z3_REAGENT]: new Fluid({
    name: FluidName.Z3_REAGENT,
    display: 'Z3 reagent',
    icon: 'z3-reagent'
  }),
  [FluidName.PARAMETER_0]: new Fluid({
    name: FluidName.PARAMETER_0,
    display: 'Parameter 0',
    icon: 'parametric-oscilator-technology'
  }),
  [FluidName.PARAMETER_1]: new Fluid({
    name: FluidName.PARAMETER_1,
    display: 'Parameter 1',
    icon: 'parametric-oscilator-technology'
  }),
  [FluidName.PARAMETER_2]: new Fluid({
    name: FluidName.PARAMETER_2,
    display: 'Parameter 2',
    icon: 'parametric-oscilator-technology'
  }),
  [FluidName.PARAMETER_3]: new Fluid({
    name: FluidName.PARAMETER_3,
    display: 'Parameter 3',
    icon: 'parametric-oscilator-technology'
  }),
  [FluidName.PARAMETER_4]: new Fluid({
    name: FluidName.PARAMETER_4,
    display: 'Parameter 4',
    icon: 'parametric-oscilator-technology'
  }),
  [FluidName.PARAMETER_5]: new Fluid({
    name: FluidName.PARAMETER_5,
    display: 'Parameter 5',
    icon: 'parametric-oscilator-technology'
  }),
  [FluidName.PARAMETER_6]: new Fluid({
    name: FluidName.PARAMETER_6,
    display: 'Parameter 6',
    icon: 'parametric-oscilator-technology'
  }),
  [FluidName.PARAMETER_7]: new Fluid({
    name: FluidName.PARAMETER_7,
    display: 'Parameter 7',
    icon: 'parametric-oscilator-technology'
  }),
  [FluidName.PARAMETER_8]: new Fluid({
    name: FluidName.PARAMETER_8,
    display: 'Parameter 8',
    icon: 'parametric-oscilator-technology'
  }),
  [FluidName.PARAMETER_9]: new Fluid({
    name: FluidName.PARAMETER_9,
    display: 'Parameter 9',
    icon: 'parametric-oscilator-technology'
  }),
  [FluidName.FLUID_UNKNOWN]: new Fluid({
    name: FluidName.FLUID_UNKNOWN,
    display: 'Unknown fluid',
    icon: 'strorix-unknown-sample'
  }),
};