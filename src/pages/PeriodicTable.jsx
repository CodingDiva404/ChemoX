import "../styles/PeriodicTable.css";

const elements = [
  // Period 1
  { symbol: "H", name: "Hydrogen", number: 1, type: "nonmetal", group: 1, period: 1, protons: 1, neutrons: 0, electrons: 1 },
  { symbol: "He", name: "Helium", number: 2, type: "noble", group: 18, period: 1, protons: 2, neutrons: 2, electrons: 2 },

  // Period 2
  { symbol: "Li", name: "Lithium", number: 3, type: "alkali", group: 1, period: 2, protons: 3, neutrons: 4, electrons: 3 },
  { symbol: "Be", name: "Beryllium", number: 4, type: "alkaline", group: 2, period: 2, protons: 4, neutrons: 5, electrons: 4 },
  { symbol: "B", name: "Boron", number: 5, type: "metalloid", group: 13, period: 2, protons: 5, neutrons: 6, electrons: 5 },
  { symbol: "C", name: "Carbon", number: 6, type: "nonmetal", group: 14, period: 2, protons: 6, neutrons: 6, electrons: 6 },
  { symbol: "N", name: "Nitrogen", number: 7, type: "nonmetal", group: 15, period: 2, protons: 7, neutrons: 7, electrons: 7 },
  { symbol: "O", name: "Oxygen", number: 8, type: "nonmetal", group: 16, period: 2, protons: 8, neutrons: 8, electrons: 8 },
  { symbol: "F", name: "Fluorine", number: 9, type: "halogen", group: 17, period: 2, protons: 9, neutrons: 10, electrons: 9 },
  { symbol: "Ne", name: "Neon", number: 10, type: "noble", group: 18, period: 2, protons: 10, neutrons: 10, electrons: 10 },

  // Period 3
  { symbol: "Na", name: "Sodium", number: 11, type: "alkali", group: 1, period: 3, protons: 11, neutrons: 12, electrons: 11 },
  { symbol: "Mg", name: "Magnesium", number: 12, type: "alkaline", group: 2, period: 3, protons: 12, neutrons: 12, electrons: 12 },
  { symbol: "Al", name: "Aluminium", number: 13, type: "post-transition", group: 13, period: 3, protons: 13, neutrons: 14, electrons: 13 },
  { symbol: "Si", name: "Silicon", number: 14, type: "metalloid", group: 14, period: 3, protons: 14, neutrons: 14, electrons: 14 },
  { symbol: "P", name: "Phosphorus", number: 15, type: "nonmetal", group: 15, period: 3, protons: 15, neutrons: 16, electrons: 15 },
  { symbol: "S", name: "Sulfur", number: 16, type: "nonmetal", group: 16, period: 3, protons: 16, neutrons: 16, electrons: 16 },
  { symbol: "Cl", name: "Chlorine", number: 17, type: "halogen", group: 17, period: 3, protons: 17, neutrons: 18, electrons: 17 },
  { symbol: "Ar", name: "Argon", number: 18, type: "noble", group: 18, period: 3, protons: 18, neutrons: 22, electrons: 18 },

  // Period 4
  { symbol: "K", name: "Potassium", number: 19, type: "alkali", group: 1, period: 4, protons: 19, neutrons: 20, electrons: 19 },
  { symbol: "Ca", name: "Calcium", number: 20, type: "alkaline", group: 2, period: 4, protons: 20, neutrons: 20, electrons: 20 },
  { symbol: "Sc", name: "Scandium", number: 21, type: "transition", group: 3, period: 4, protons: 21, neutrons: 24, electrons: 21 },
  { symbol: "Ti", name: "Titanium", number: 22, type: "transition", group: 4, period: 4, protons: 22, neutrons: 26, electrons: 22 },
  { symbol: "V", name: "Vanadium", number: 23, type: "transition", group: 5, period: 4, protons: 23, neutrons: 28, electrons: 23 },
  { symbol: "Cr", name: "Chromium", number: 24, type: "transition", group: 6, period: 4, protons: 24, neutrons: 28, electrons: 24 },
  { symbol: "Mn", name: "Manganese", number: 25, type: "transition", group: 7, period: 4, protons: 25, neutrons: 30, electrons: 25 },
  { symbol: "Fe", name: "Iron", number: 26, type: "transition", group: 8, period: 4, protons: 26, neutrons: 30, electrons: 26 },
  { symbol: "Co", name: "Cobalt", number: 27, type: "transition", group: 9, period: 4, protons: 27, neutrons: 32, electrons: 27 },
  { symbol: "Ni", name: "Nickel", number: 28, type: "transition", group: 10, period: 4, protons: 28, neutrons: 31, electrons: 28 },
  { symbol: "Cu", name: "Copper", number: 29, type: "transition", group: 11, period: 4, protons: 29, neutrons: 35, electrons: 29 },
  { symbol: "Zn", name: "Zinc", number: 30, type: "transition", group: 12, period: 4, protons: 30, neutrons: 35, electrons: 30 },
  { symbol: "Ga", name: "Gallium", number: 31, type: "post-transition", group: 13, period: 4, protons: 31, neutrons: 39, electrons: 31 },
  { symbol: "Ge", name: "Germanium", number: 32, type: "metalloid", group: 14, period: 4, protons: 32, neutrons: 41, electrons: 32 },
  { symbol: "As", name: "Arsenic", number: 33, type: "metalloid", group: 15, period: 4, protons: 33, neutrons: 42, electrons: 33 },
  { symbol: "Se", name: "Selenium", number: 34, type: "nonmetal", group: 16, period: 4, protons: 34, neutrons: 45, electrons: 34 },
  { symbol: "Br", name: "Bromine", number: 35, type: "halogen", group: 17, period: 4, protons: 35, neutrons: 45, electrons: 35 },
  { symbol: "Kr", name: "Krypton", number: 36, type: "noble", group: 18, period: 4, protons: 36, neutrons: 48, electrons: 36 },

  // Period 5
  { symbol: "Rb", name: "Rubidium", number: 37, type: "alkali", group: 1, period: 5, protons: 37, neutrons: 48, electrons: 37 },
  { symbol: "Sr", name: "Strontium", number: 38, type: "alkaline", group: 2, period: 5, protons: 38, neutrons: 50, electrons: 38 },
  { symbol: "Y", name: "Yttrium", number: 39, type: "transition", group: 3, period: 5, protons: 39, neutrons: 50, electrons: 39 },
  { symbol: "Zr", name: "Zirconium", number: 40, type: "transition", group: 4, period: 5, protons: 40, neutrons: 51, electrons: 40 },
  { symbol: "Nb", name: "Niobium", number: 41, type: "transition", group: 5, period: 5, protons: 41, neutrons: 52, electrons: 41 },
  { symbol: "Mo", name: "Molybdenum", number: 42, type: "transition", group: 6, period: 5, protons: 42, neutrons: 54, electrons: 42 },
  { symbol: "Tc", name: "Technetium", number: 43, type: "transition", group: 7, period: 5, protons: 43, neutrons: 55, electrons: 43 },
  { symbol: "Ru", name: "Ruthenium", number: 44, type: "transition", group: 8, period: 5, protons: 44, neutrons: 57, electrons: 44 },
  { symbol: "Rh", name: "Rhodium", number: 45, type: "transition", group: 9, period: 5, protons: 45, neutrons: 58, electrons: 45 },
  { symbol: "Pd", name: "Palladium", number: 46, type: "transition", group: 10, period: 5, protons: 46, neutrons: 60, electrons: 46 },
  { symbol: "Ag", name: "Silver", number: 47, type: "transition", group: 11, period: 5, protons: 47, neutrons: 61, electrons: 47 },
  { symbol: "Cd", name: "Cadmium", number: 48, type: "transition", group: 12, period: 5, protons: 48, neutrons: 64, electrons: 48 },
  { symbol: "In", name: "Indium", number: 49, type: "post-transition", group: 13, period: 5, protons: 49, neutrons: 66, electrons: 49 },
  { symbol: "Sn", name: "Tin", number: 50, type: "post-transition", group: 14, period: 5, protons: 50, neutrons: 69, electrons: 50 },
  { symbol: "Sb", name: "Antimony", number: 51, type: "metalloid", group: 15, period: 5, protons: 51, neutrons: 71, electrons: 51 },
  { symbol: "Te", name: "Tellurium", number: 52, type: "metalloid", group: 16, period: 5, protons: 52, neutrons: 76, electrons: 52 },
  { symbol: "I", name: "Iodine", number: 53, type: "halogen", group: 17, period: 5, protons: 53, neutrons: 74, electrons: 53 },
  { symbol: "Xe", name: "Xenon", number: 54, type: "noble", group: 18, period: 5, protons: 54, neutrons: 77, electrons: 54 },

  // Period 6
  { symbol: "Cs", name: "Cesium", number: 55, type: "alkali", group: 1, period: 6, protons: 55, neutrons: 78, electrons: 55 },
  { symbol: "Ba", name: "Barium", number: 56, type: "alkaline", group: 2, period: 6, protons: 56, neutrons: 81, electrons: 56 },

  // Lanthanoids (shown separately, period 8 visually)
  { symbol: "La", name: "Lanthanum", number: 57, type: "lanthanide", group: 3, period: 6, protons: 57, neutrons: 82, electrons: 57 },
  { symbol: "Ce", name: "Cerium", number: 58, type: "lanthanoid", group: 4, period: 8, protons: 58, neutrons: 82, electrons: 58 },
  { symbol: "Pr", name: "Praseodymium", number: 59, type: "lanthanoid", group: 5, period: 8, protons: 59, neutrons: 82, electrons: 59 },
  { symbol: "Nd", name: "Neodymium", number: 60, type: "lanthanoid", group: 6, period: 8, protons: 60, neutrons: 84, electrons: 60 },
  { symbol: "Pm", name: "Promethium", number: 61, type: "lanthanoid", group: 7, period: 8, protons: 61, neutrons: 84, electrons: 61 },
  { symbol: "Sm", name: "Samarium", number: 62, type: "lanthanoid", group: 8, period: 8, protons: 62, neutrons: 88, electrons: 62 },
  { symbol: "Eu", name: "Europium", number: 63, type: "lanthanoid", group: 9, period: 8, protons: 63, neutrons: 89, electrons: 63 },
  { symbol: "Gd", name: "Gadolinium", number: 64, type: "lanthanoid", group: 10, period: 8, protons: 64, neutrons: 93, electrons: 64 },
  { symbol: "Tb", name: "Terbium", number: 65, type: "lanthanoid", group: 11, period: 8, protons: 65, neutrons: 94, electrons: 65 },
  { symbol: "Dy", name: "Dysprosium", number: 66, type: "lanthanoid", group: 12, period: 8, protons: 66, neutrons: 97, electrons: 66 },
  { symbol: "Ho", name: "Holmium", number: 67, type: "lanthanoid", group: 13, period: 8, protons: 67, neutrons: 98, electrons: 67 },
  { symbol: "Er", name: "Erbium", number: 68, type: "lanthanoid", group: 14, period: 8, protons: 68, neutrons: 99, electrons: 68 },
  { symbol: "Tm", name: "Thulium", number: 69, type: "lanthanoid", group: 15, period: 8, protons: 69, neutrons: 100, electrons: 69 },
  { symbol: "Yb", name: "Ytterbium", number: 70, type: "lanthanoid", group: 16, period: 8, protons: 70, neutrons: 103, electrons: 70 },
  { symbol: "Lu", name: "Lutetium", number: 71, type: "lanthanoid", group: 17, period: 8, protons: 71, neutrons: 104, electrons: 71 },

  // Back to main table
  { symbol: "Hf", name: "Hafnium", number: 72, type: "transition", group: 4, period: 6, protons: 72, neutrons: 106, electrons: 72 },
  { symbol: "Ta", name: "Tantalum", number: 73, type: "transition", group: 5, period: 6, protons: 73, neutrons: 108, electrons: 73 },
  { symbol: "W", name: "Tungsten", number: 74, type: "transition", group: 6, period: 6, protons: 74, neutrons: 110, electrons: 74 },
  { symbol: "Re", name: "Rhenium", number: 75, type: "transition", group: 7, period: 6, protons: 75, neutrons: 111, electrons: 75 },
  { symbol: "Os", name: "Osmium", number: 76, type: "transition", group: 8, period: 6, protons: 76, neutrons: 114, electrons: 76 },
  { symbol: "Ir", name: "Iridium", number: 77, type: "transition", group: 9, period: 6, protons: 77, neutrons: 115, electrons: 77 },
  { symbol: "Pt", name: "Platinum", number: 78, type: "transition", group: 10, period: 6, protons: 78, neutrons: 117, electrons: 78 },
  { symbol: "Au", name: "Gold", number: 79, type: "transition", group: 11, period: 6, protons: 79, neutrons: 118, electrons: 79 },
  { symbol: "Hg", name: "Mercury", number: 80, type: "transition", group: 12, period: 6, protons: 80, neutrons: 121, electrons: 80 },
  { symbol: "Tl", name: "Thallium", number: 81, type: "post-transition", group: 13, period: 6, protons: 81, neutrons: 123, electrons: 81 },
  { symbol: "Pb", name: "Lead", number: 82, type: "post-transition", group: 14, period: 6, protons: 82, neutrons: 125, electrons: 82 },
  { symbol: "Bi", name: "Bismuth", number: 83, type: "post-transition", group: 15, period: 6, protons: 83, neutrons: 126, electrons: 83 },
  { symbol: "Po", name: "Polonium", number: 84, type: "metalloid", group: 16, period: 6, protons: 84, neutrons: 125, electrons: 84 },
  { symbol: "At", name: "Astatine", number: 85, type: "halogen", group: 17, period: 6, protons: 85, neutrons: 125, electrons: 85 },
  { symbol: "Rn", name: "Radon", number: 86, type: "noble", group: 18, period: 6, protons: 86, neutrons: 136, electrons: 86 },

  // Period 7
  { symbol: "Fr", name: "Francium", number: 87, type: "alkali", group: 1, period: 7, protons: 87, neutrons: 136, electrons: 87 },
  { symbol: "Ra", name: "Radium", number: 88, type: "alkaline", group: 2, period: 7, protons: 88, neutrons: 138, electrons: 88 },

  // Actinoids (shown separately, period 9 visually)
  { symbol: "Ac", name: "Actinium", number: 89, type: "actinide", group: 3, period: 7, protons: 89, neutrons: 138, electrons: 89 },
  { symbol: "Th", name: "Thorium", number: 90, type: "actinoid", group: 4, period: 9, protons: 90, neutrons: 142, electrons: 90 },
  { symbol: "Pa", name: "Protactinium", number: 91, type: "actinoid", group: 5, period: 9, protons: 91, neutrons: 140, electrons: 91 },
  { symbol: "U", name: "Uranium", number: 92, type: "actinoid", group: 6, period: 9, protons: 92, neutrons: 146, electrons: 92 },
  { symbol: "Np", name: "Neptunium", number: 93, type: "actinoid", group: 7, period: 9, protons: 93, neutrons: 144, electrons: 93 },
  { symbol: "Pu", name: "Plutonium", number: 94, type: "actinoid", group: 8, period: 9, protons: 94, neutrons: 150, electrons: 94 },
  { symbol: "Am", name: "Americium", number: 95, type: "actinoid", group: 9, period: 9, protons: 95, neutrons: 148, electrons: 95 },
  { symbol: "Cm", name: "Curium", number: 96, type: "actinoid", group: 10, period: 9, protons: 96, neutrons: 151, electrons: 96 },
  { symbol: "Bk", name: "Berkelium", number: 97, type: "actinoid", group: 11, period: 9, protons: 97, neutrons: 150, electrons: 97 },
  { symbol: "Cf", name: "Californium", number: 98, type: "actinoid", group: 12, period: 9, protons: 98, neutrons: 153, electrons: 98 },
  { symbol: "Es", name: "Einsteinium", number: 99, type: "actinoid", group: 13, period: 9, protons: 99, neutrons: 153, electrons: 99 },
  { symbol: "Fm", name: "Fermium", number: 100, type: "actinoid", group: 14, period: 9, protons: 100, neutrons: 157, electrons: 100 },
  { symbol: "Md", name: "Mendelevium", number: 101, type: "actinoid", group: 15, period: 9, protons: 101, neutrons: 157, electrons: 101 },
  { symbol: "No", name: "Nobelium", number: 102, type: "actinoid", group: 16, period: 9, protons: 102, neutrons: 157, electrons: 102 },
  { symbol: "Lr", name: "Lawrencium", number: 103, type: "actinoid", group: 17, period: 9, protons: 103, neutrons: 159, electrons: 103 },

  // Back to main table
  { symbol: "Rf", name: "Rutherfordium", number: 104, type: "transition", group: 4, period: 7, protons: 104, neutrons: 157, electrons: 104 },
  { symbol: "Db", name: "Dubnium", number: 105, type: "transition", group: 5, period: 7, protons: 105, neutrons: 157, electrons: 105 },
  { symbol: "Sg", name: "Seaborgium", number: 106, type: "transition", group: 6, period: 7, protons: 106, neutrons: 160, electrons: 106 },
  { symbol: "Bh", name: "Bohrium", number: 107, type: "transition", group: 7, period: 7, protons: 107, neutrons: 161, electrons: 107 },
  { symbol: "Hs", name: "Hassium", number: 108, type: "transition", group: 8, period: 7, protons: 108, neutrons: 169, electrons: 108 },
  { symbol: "Mt", name: "Meitnerium", number: 109, type: "transition", group: 9, period: 7, protons: 109, neutrons: 169, electrons: 109 },
  { symbol: "Ds", name: "Darmstadtium", number: 110, type: "transition", group: 10, period: 7, protons: 110, neutrons: 171, electrons: 110 },
  { symbol: "Rg", name: "Roentgenium", number: 111, type: "transition", group: 11, period: 7, protons: 111, neutrons: 171, electrons: 111 },
  { symbol: "Cn", name: "Copernicium", number: 112, type: "transition", group: 12, period: 7, protons: 112, neutrons: 173, electrons: 112 },
  { symbol: "Nh", name: "Nihonium", number: 113, type: "post-transition", group: 13, period: 7, protons: 113, neutrons: 173, electrons: 113 },
  { symbol: "Fl", name: "Flerovium", number: 114, type: "post-transition", group: 14, period: 7, protons: 114, neutrons: 175, electrons: 114 },
  { symbol: "Mc", name: "Moscovium", number: 115, type: "post-transition", group: 15, period: 7, protons: 115, neutrons: 175, electrons: 115 },
  { symbol: "Lv", name: "Livermorium", number: 116, type: "post-transition", group: 16, period: 7, protons: 116, neutrons: 177, electrons: 116 },
  { symbol: "Ts", name: "Tennessine", number: 117, type: "halogen", group: 17, period: 7, protons: 117, neutrons: 177, electrons: 117 },
  { symbol: "Og", name: "Oganesson", number: 118, type: "noble", group: 18, period: 7, protons: 118, neutrons: 176, electrons: 118 }

];


const PeriodicTable = () => {
  return (
    <div className="pt-wrapper">
      <h1 className="pt-title">Interactive Periodic Table</h1>

      <p className="pt-hint">Swipe → to explore the periodic table</p>

      <div className="pt-scroll">
        <div className="pt-grid">
          {elements.map((el) => (
            <div
              key={el.number}
              className={`pt-card ${el.type}`}
              style={{
                gridColumn: el.group,
                gridRow: el.period
              }}
            >
              <span className="pt-number">{el.number}</span>
              <h2 className="pt-symbol">{el.symbol}</h2>
              <p className="pt-name">{el.name}</p>

              <div className="pt-popup">
                <h4>{el.name} Structure</h4>
                <p>Protons: {el.protons}</p>
                <p>Neutrons: {el.neutrons}</p>
                <p>Electrons: {el.electrons}</p>

                <div className="nucleus">
                  {Array.from({ length: Math.min(el.electrons, 3) }).map((_, i) => (
                    <div key={i} className="electron"></div>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PeriodicTable;