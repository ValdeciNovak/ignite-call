import { useState } from 'react'
import { CalendarStep } from './CalendarStep'
import { ConfirmStep } from './ConfirmStep'

export function ScheduleForm() {
  const [selectDateTime, setSelectDateTime] = useState<Date | null>()

  function handleClearSelectDateTime() {
    setSelectDateTime(null)
  }

  if (selectDateTime) {
    return (
      <ConfirmStep
        schedulingDate={selectDateTime}
        onCancelConfirmation={handleClearSelectDateTime}
      />
    )
  }

  return <CalendarStep onSelectDateTime={setSelectDateTime} />
}
