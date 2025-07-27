export abstract class DomainError extends Error {
  abstract type: string;
  abstract override message: string;

  toPrimitives(): {
    type: string;
    description: string;
    data: Record<string, unknown>;
  } {
    const props = Object.entries(this).filter(
      ([key, _]) => key !== 'type' && key !== 'message'
    );

    return {
      type: this.type,
      description: this.message,
      data: Object.fromEntries(props),
    };
  }
}
