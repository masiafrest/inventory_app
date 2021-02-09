import { useRouteMatch } from "react-router-dom";

export default function useDynamicComponent<T>(components: T) {
  const { path } = useRouteMatch();
  const strSplited = path.split("/");
  const componentName = strSplited[2];
  const DynamicComponent = components[componentName];

  return DynamicComponent;
}
