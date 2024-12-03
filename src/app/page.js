import Home from "@/components/home/home.component";
import TrailingIcons from "@/components/ui/trailing-icons/trailing-icons.ui";
import useWeatherStore from "./stores/weather-store";

export default function HomePage() {
  return (
    <div>
      <main>
        <Home />
      </main>
    </div>
  );
}
