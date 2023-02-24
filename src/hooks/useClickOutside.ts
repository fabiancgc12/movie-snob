import {RefObject, useEffect} from "react";

type Handler = (event: MouseEvent) => void
function useOnClickOutside<T extends HTMLElement = HTMLElement>(ref:RefObject<T>, handler:Handler) {
    useEffect(
        () => {
            const listener:Handler = (event) => {
                if (!ref.current || ref.current.contains(event.target as Node))
                    return;
                handler(event);
            };
                document.addEventListener("mousedown", listener);
                document.addEventListener("mouseup", listener);
            return () => {
                document.removeEventListener("mousedown", listener);
                document.removeEventListener("mouseup", listener);
            };
        },
        [ref, handler]
    );
}
export default useOnClickOutside