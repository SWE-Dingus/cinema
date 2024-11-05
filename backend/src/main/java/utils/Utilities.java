package utils;

import java.util.function.Supplier;

public class Utilities {
  public static <R, T extends Throwable, S extends Supplier<T>> R nonNullOrThrow(R what, S supplier)
      throws T {
    if (what == null) {
      throw supplier.get();
    }
    return what;
  }
}
