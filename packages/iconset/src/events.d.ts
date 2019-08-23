/**
 * Omit the given keys from an object type.
 */
export declare type Omit<T, K extends keyof T> = T extends any
    ? Pick<T, Exclude<keyof T, K>>
    : never;
/**
 * Extracts a CustomEvent payload type from a CustomEvent type.
 */
declare type UnpackCustomEventPayload<T> = T extends CustomEvent<infer U>
    ? U
    : never;
/**
 * Extracts the CustomEvent detail type from a CustomEvent type using the name of the event as the key
 * and the DocumentEventMap.
 * E.g. UnpackCustomEventDetail<'my-cool-event'>
 */
export declare type UnpackCustomEventDetail<
    T extends keyof DocumentEventMap
> = UnpackCustomEventPayload<DocumentEventMap[T]>;
/**
 * A strongly typed CustomEvent based on the event name using the global DocumentEventMap.
 * E.g. StrictCustomEvent<'my-cool-event'>
 */
export declare type StrictCustomEvent<
    T extends keyof DocumentEventMap
> = CustomEvent<UnpackCustomEventPayload<DocumentEventMap[T]>>;
/**
 * A helper type to create a CustomEventInit type from a event detail type.
 */
declare type StrictCustomEventInit<T> = T extends void
    ? CustomEventInit<T>
    : Omit<CustomEventInit<T>, 'detail'> & {
          detail: T;
      };
/**
 * Creates a strictly typed CustomEvent<T> using the DocumentEventMap.
 *
 * To make use of this helper ensure that your events are added to the DocumentEventMap. The
 * easiest way to do this is to include them in the GlobalEventMap
 *
 * @param name The name of the CustomEvent to create
 * @param payload The arguments for the CustomEvent constructor
 */
export declare function strictCustomEvent<
    T extends keyof DocumentEventMap,
    D extends UnpackCustomEventPayload<DocumentEventMap[T]>,
    C extends StrictCustomEventInit<D>
>(name: T, payload: C): CustomEvent<D>;
export {};
