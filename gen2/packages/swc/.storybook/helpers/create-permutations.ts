/**
 * Copyright 2026 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

/**
 * Each key maps to the list of values that prop should take across the
 * cartesian product this set describes.
 */
type PermutationSet = Readonly<Record<string, readonly unknown[]>>;

export type ComponentPermutations<Set extends PermutationSet> = {
  [PropName in keyof Set]: Set[PropName] extends readonly (infer Value)[]
    ? Value
    : never;
};

/**
 * Expands one or more permutation sets into the flat list of prop objects
 * they describe. Each set in `permutationSets` is expanded independently
 * (its own cartesian product across all of its props) and the results are
 * concatenated. Pass multiple sets when only some prop combinations are
 * valid (e.g. `outline` fill-style only applying to two variants) rather
 * than describing invalid combinations and filtering them out afterward.
 */
export function createPermutations<
  const Sets extends readonly PermutationSet[],
>(permutationSets: Sets): Array<ComponentPermutations<Sets[number]>> {
  return permutationSets.flatMap((set) => expandPermutationSet(set));
}

function expandPermutationSet<Set extends PermutationSet>(
  set: Set
): Array<ComponentPermutations<Set>> {
  const propertyNames = Object.keys(set) as Array<keyof Set>;
  const result: Array<ComponentPermutations<Set>> = [];

  const addPermutations = (
    remainingPropertyNames: Array<keyof Set>,
    current: Partial<ComponentPermutations<Set>>
  ) => {
    if (remainingPropertyNames.length === 0) {
      result.push({ ...current } as ComponentPermutations<Set>);
      return;
    }
    const [propertyName, ...rest] = remainingPropertyNames;
    for (const value of set[propertyName]) {
      addPermutations(rest, { ...current, [propertyName]: value });
    }
  };

  addPermutations(propertyNames, {});
  return result;
}
