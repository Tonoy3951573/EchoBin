import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database, deviceUID, firebaseInitError } from "../firebase/config";

/**
 * Subscribes to devices/{deviceUID}/status in real time.
 * Returns { status, lastUpdated, loading, error }.
 */
export function useDeviceStatus() {
  const [state, setState] = useState({
    status: null,
    lastUpdated: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (firebaseInitError) {
      setState({ status: null, lastUpdated: null, loading: false, error: firebaseInitError });
      return;
    }
    if (!deviceUID) {
      setState({
        status: null,
        lastUpdated: null,
        loading: false,
        error: new Error("VITE_DEVICE_UID is not set. Add it to your .env file."),
      });
      return;
    }

    const statusRef = ref(database, `devices/${deviceUID}/status`);
    const unsubscribe = onValue(
      statusRef,
      (snapshot) => {
        setState({
          status: snapshot.val(),
          lastUpdated: Date.now(),
          loading: false,
          error: null,
        });
      },
      (error) => {
        setState((s) => ({ ...s, loading: false, error }));
      }
    );

    return () => unsubscribe();
  }, []);

  return state;
}
