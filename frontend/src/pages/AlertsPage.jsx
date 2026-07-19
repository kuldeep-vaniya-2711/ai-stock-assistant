import PriceAlertCard from "../components/PriceAlertCard";

function AlertsPage() {

  return (

    <section
      id="alerts"
      className="space-y-6"
    >

      <div>

        <h2 className="text-2xl font-bold">
          Price Alerts
        </h2>

        <p className="text-slate-400">
          Create and manage your stock price alerts.
        </p>

      </div>

      <PriceAlertCard />

    </section>

  );

}

export default AlertsPage;