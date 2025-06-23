import * as path from 'node:path';
import { Glob } from 'bun';

/**
 * Recursively traverses a module's exports to find and collect all classes.
 * @param exported The exported module or value.
 * @param allLoaded The accumulator for loaded classes.
 */
function extractClassesFromExport(
  exported: unknown,
  allLoaded: (() => unknown)[]
): void {
  if (typeof exported === 'function') {
    allLoaded.push(() => exported);
    return;
  }

  if (Array.isArray(exported)) {
    for (const item of exported) {
      extractClassesFromExport(item, allLoaded);
    }
    return;
  }

  if (exported && typeof exported === 'object') {
    for (const key in exported) {
      if (Object.prototype.hasOwnProperty.call(exported, key)) {
        extractClassesFromExport(
          (exported as Record<string, unknown>)[key],
          allLoaded
        );
      }
    }
  }
}

/**
 * Scans directories for files, filters them, and imports them as modules.
 * @param directories The directories to scan.
 * @param formats The file formats to include.
 * @returns An array of imported modules.
 */
function findAndImportModules(
  directories: string[],
  formats: string[]
): unknown[] {
  const allFiles = directories.flatMap((dir) => {
    const glob = new Glob(path.basename(dir));
    return Array.from(
      glob.scanSync({
        cwd: path.dirname(dir),
      })
    ).map((file) => path.join(path.dirname(dir), file));
  });

  const isValidFile = (file: string): boolean => {
    const dtsExtension = file.substring(file.length - 5, file.length);
    return formats.includes(path.extname(file)) && dtsExtension !== '.d.ts';
  };

  return allFiles.filter(isValidFile).map((file) => {
    return require(file);
  });
}

/**
 * Loads all exported classes from the given directory.
 * @see https://github.com/typestack/routing-controllers/blob/master/src/util/importClassesFromDirectories.ts
 */
export function importClassesFromDirectories(
  directories: string[],
  formats = ['.js', '.ts']
): (() => unknown)[] {
  const importedModules = findAndImportModules(directories, formats);
  const loadedClasses: (() => unknown)[] = [];
  extractClassesFromExport(importedModules, loadedClasses);

  return loadedClasses;
}
