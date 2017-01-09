var parse = require('../parse/index.js')

var MILLISECONDS_IN_DAY = 24 * 60 * 60 * 1000

/**
 * @category Range Helpers
 * @summary Get the number of days that overlap in two date ranges
 *
 * @description
 * Get the number of days that overlap in two date ranges
 *
 * @param {Range} rangeLeft - the first range to compare. See [Range]{@link docs/Range}
 * @param {Range} rangeRight - the second range to compare. See [Range]{@link docs/Range}
 * @returns {Number} the number of days that overlap in two date ranges
 * @throws {Error} The start of a range cannot be after its end
 *
 * @example
 * // For overlapping date ranges adds 1 for each started overlapping day:
 * getOverlappingDaysInRanges(
 *   {start: new Date(2014, 0, 10), end: new Date(2014, 0, 20)},
 *   {start: new Date(2014, 0, 17), end: new Date(2014, 0, 21)}
 * )
 * //=> 3
 *
 * @example
 * // For non-overlapping date ranges returns 0:
 * getOverlappingDaysInRanges(
 *   {start: new Date(2014, 0, 10), end: new Date(2014, 0, 20)},
 *   {start: new Date(2014, 0, 21), end: new Date(2014, 0, 22)}
 * )
 * //=> 0
 */
function getOverlappingDaysInRanges (dirtyRangeLeft, dirtyRangeRight) {
  var leftStartTime = parse(dirtyRangeLeft.start).getTime()
  var leftEndTime = parse(dirtyRangeLeft.end).getTime()
  var rightStartTime = parse(dirtyRangeRight.start).getTime()
  var rightEndTime = parse(dirtyRangeRight.end).getTime()

  if (leftStartTime > leftEndTime || rightStartTime > rightEndTime) {
    throw new Error('The start of a range cannot be after its end')
  }

  var isOverlapping = leftStartTime < rightEndTime && rightStartTime < leftEndTime

  if (!isOverlapping) {
    return 0
  }

  var overlapStartDate = rightStartTime < leftStartTime
    ? leftStartTime
    : rightStartTime

  var overlapEndDate = rightEndTime > leftEndTime
    ? leftEndTime
    : rightEndTime

  var differenceInMs = overlapEndDate - overlapStartDate

  return Math.ceil(differenceInMs / MILLISECONDS_IN_DAY)
}

module.exports = getOverlappingDaysInRanges