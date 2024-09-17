import { SnackbarProvider as Provider } from "notistack";
import { PropsWithChildren } from "react";

export default function SnackbarProvider({children}: PropsWithChildren) {
  return (
    <Provider>
      {children}
    </Provider>
  )
}