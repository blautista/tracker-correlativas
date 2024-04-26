import { useState } from "react";
import "./App.css";

type Subject = {
  id: string;
  name: string;
  correlatives?: string[];
};

function createSubject({
  id,
  name,
  correlatives,
}: {
  id: string;
  name: string;
  correlatives?: Subject[];
}): Subject {
  return { id, name, correlatives: correlatives?.map(({ id }) => id) };
}

const ANALISIS_I = createSubject({
  id: "INGM101",
  name: "Análisis Matemático I",
});

const ALGEBRA_I = createSubject({
  id: "INGM105",
  name: "Álgebra I",
});

const INFORMATICA_BASICA = createSubject({
  id: "ING6102",
  name: "Informática Básica",
});

const TECNOLOGIAS_INFORMATICAS_A = createSubject({
  id: "ING6301",
  name: "Tecnologías Informáticas A",
});

const ANALISIS_II = createSubject({
  id: "INGM102",
  name: "Análisis Matemático II",
  correlatives: [ANALISIS_I],
});

const ALGEBRA_II = createSubject({
  id: "INGM106",
  name: "Álgebra II",
  correlatives: [ALGEBRA_I],
});

const PROGRAMACION_A = createSubject({
  id: "ING6201",
  name: "Programación A",
  correlatives: [ANALISIS_I, ALGEBRA_I, INFORMATICA_BASICA],
});

const MATEMATICA_DISCRETA = createSubject({
  id: "INGM107",
  name: "Introducción a la Matemática Discreta",
  correlatives: [ALGEBRA_I, INFORMATICA_BASICA],
});

const FISICA_A = createSubject({
  id: "INGF101",
  name: "Física A",
  correlatives: [ANALISIS_I, ALGEBRA_I],
});

const ESTADISTICA = createSubject({
  id: "INGM108",
  name: "Probabilidad y Estadística",
  correlatives: [ANALISIS_II],
});

const PROGRAMACION_B = createSubject({
  id: "ING6202",
  name: "Programación B",
  correlatives: [MATEMATICA_DISCRETA, PROGRAMACION_A],
});

const TECNOLOGIAS_INFORMATICAS_B = createSubject({
  id: "ING6302",
  name: "Tecnologías Informáticas B",
  correlatives: [TECNOLOGIAS_INFORMATICAS_A, PROGRAMACION_A],
});

const FISICA_B = createSubject({
  id: "INGF103",
  name: "Física B",
  correlatives: [ANALISIS_II, ALGEBRA_II, FISICA_A],
});

const TEORIAS_INFORMACION = createSubject({
  id: "ING6203",
  name: "Teorías de la Información y la Comunicación",
  correlatives: [ESTADISTICA, PROGRAMACION_B],
});

const ARQUITECTURA_COMPUTADORAS = createSubject({
  id: "ING6204",
  name: "Fundamentos de la Arquitectura de Computadoras",
  correlatives: [FISICA_A, PROGRAMACION_B],
});

const PROGRAMACION_C = createSubject({
  id: "ING6205",
  name: "Programación C",
  correlatives: [TECNOLOGIAS_INFORMATICAS_B, PROGRAMACION_B],
});

const allSubjects: Subject[] = [
  ANALISIS_I,
  ALGEBRA_I,
  INFORMATICA_BASICA,
  TECNOLOGIAS_INFORMATICAS_A,
  ANALISIS_II,
  ALGEBRA_II,
  PROGRAMACION_A,
  MATEMATICA_DISCRETA,
  FISICA_A,
  ESTADISTICA,
  PROGRAMACION_B,
  TECNOLOGIAS_INFORMATICAS_B,
  FISICA_B,
  TEORIAS_INFORMACION,
  ARQUITECTURA_COMPUTADORAS,
  PROGRAMACION_C,
];

function findAvailableSubjects(
  completedSubjects: string[],
  subjects: Subject[]
): Subject[] {
  const completedSubjectSet = new Set(completedSubjects);

  const allSubjects = subjects.filter(({ id }) => !completedSubjectSet.has(id));

  return allSubjects.filter(({ correlatives }) =>
    correlatives
      ? correlatives?.every((correlativeId) =>
          completedSubjectSet.has(correlativeId)
        )
      : true
  );
}

function findAvailableSubjectIds(
  completedSubjects: string[],
  subjects: Subject[]
): string[] {
  return findAvailableSubjects(completedSubjects, subjects).map(({ id }) => id);
}

function App() {
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

  const availableSubjects = findAvailableSubjectIds(
    selectedSubjects,
    allSubjects
  );

  function handleRowClick(subjectId: string) {
    if (
      !availableSubjects.includes(subjectId) &&
      !selectedSubjects.includes(subjectId)
    )
      return;
    setSelectedSubjects((subjectIds) =>
      subjectIds.includes(subjectId)
        ? subjectIds.filter((id) => id !== subjectId)
        : [...new Set([...subjectIds, subjectId])]
    );
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Código</th>
          <th>Nombre</th>
          <th>Correlativas</th>
        </tr>
      </thead>
      <tbody>
        {allSubjects.map(({ id, name, correlatives }) => (
          <tr
            onClick={() => handleRowClick(id)}
            style={{
              background: selectedSubjects.includes(id)
                ? "green"
                : availableSubjects.includes(id)
                ? "lightgray"
                : "gray",
            }}
          >
            <td>{id}</td>
            <td>{name}</td>
            <td>{correlatives ? correlatives?.join(", ") : ""}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default App;
