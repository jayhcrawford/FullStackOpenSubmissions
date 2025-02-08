interface HeaderProps {
  name: string;
}

interface ContentProps {
  courseParts: Array<CoursePart>;
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CourseWithDescription extends CoursePartBase {
  description?: string;
}

interface CoursePartBasic extends CourseWithDescription {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CourseWithDescription {
  backgroundMaterial: string;
  kind: "background";
}

type CoursePart = CoursePartBasic | CoursePartBackground | CoursePartGroup;

interface TotalProps {
  totalExercises: number;
}

const Header = (props: HeaderProps) => {
  return <h1>{props.name}</h1>;
};

interface PartProps {
  name: string;
  exerciseCount: number;
  description?: string;
  backgroundMaterial?: string;
  kind: string;
  groupProjectCount?: number;
}

const Part = (props: PartProps) => {
  const type = props.kind;

  switch (type) {
    case "basic":
      return (
        <li key={`${props.name}+${props.exerciseCount}`}>
          <h4>{props.name}</h4>
          <p>{props.description}</p>
        </li>
      );
    case "group":
      return (
        <li key={`${props.name}+${props.exerciseCount}`}>
          {" "}
          <h4>{props.name}</h4>
        </li>
      );
    case "background":
      return (
        <li key={`${props.name}+${props.exerciseCount}`}>
          {" "}
          <h4>{props.name}</h4>
        </li>
      );
    default:
      return "error";
  }
};

const Content = (props: ContentProps) => {
  return (
    <>
      <ul style={{ listStyle: "none", paddingLeft: "0" }}>
        {props.courseParts.map((course) => {
          return (
            <Part
              key={course.name}
              name={course.name}
              kind={course.kind}
              exerciseCount={course.exerciseCount}
              description={course.description}
            />
          );

          /*             <li key={`${course.exerciseCount}+${course.name.slice(0, 3)}`}></li>
           */
        })}
      </ul>
    </>
  );
};

const Total = (props: TotalProps) => {
  return <p>Number of exercises {props.totalExercises}</p>;
};

const App = () => {
  const courseName = "Half Stack application development";

  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group",
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial:
        "https://type-level-typescript.com/template-literal-types",
      kind: "background",
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
  ];

  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  );

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total totalExercises={totalExercises} />
    </div>
  );
};

export default App;
