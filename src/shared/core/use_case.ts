/**
 * Represents an application use case contract.
 * @template TRequest - The request type.
 * @template TResponse - The response type.
 */
export interface UseCase<TRequest, TResponse> {
  /**
   * Executes the use case logic.
   * @param request The request object. May be undefined if the use case does not require input.
   * @returns A promise or value of the response type.
   */
  execute(request: TRequest | undefined): Promise<TResponse> | TResponse;
}
