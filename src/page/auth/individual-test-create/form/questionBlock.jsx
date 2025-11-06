import { Trash2 } from "lucide-react";
import Button from "../../../../components/button";
import Input from "../../../../components/input";
import { Controller, useFieldArray, useWatch } from "react-hook-form";
import { Select } from "antd";

function QuestionBlock({
  index,
  control,
  correctQuizId,
  errors,
  register,
  removeQuestion,
  qLength,
  setCorrectQuizId,
}) {
  const {
    fields: options,
    append: appendOption,
    remove: removeOption,
  } = useFieldArray({
    control,
    name: `questions.${index}.options`,
  });

  const watchedOptions = useWatch({
    control,
    name: `questions.${index}.options`,
  });

  return (
    <div className="relative w-full py-10 px-5 sm:px-10 min-[1000px]:px-20 bg-[#141f25] rounded-[30px] mb-10">
      <div className="absolute top-5 right-5">
        {qLength > 1 && (
          <Button
            type="button"
            className="border-2 cursor-pointer border-[red] p-2"
            onClick={() => removeQuestion(index)}
          >
            <Trash2 size={20} color="red" />
          </Button>
        )}
      </div>

      <h2 className="text-[25px] md:text-[40px] font-bold text-white mb-2">
        Savol - {index + 1}
      </h2>

      <label>
        <span className="text-[16px] sm:text-[20px] font-medium text-white mb-2 inline-block">
          Savol matnini kiriting
        </span>
        <Input
          placeholder="Savol"
          className="text-white mb-10 w-full"
          {...register(`questions.${index}.questionText`)}
          error={errors.questions?.[index]?.questionText?.message}
        />
      </label>

      <span className="text-[16px] sm:text-[20px] font-medium text-white mb-2 inline-block">
        Javob varyantlarni kiriting
      </span>

      {options.map((opt, optionsIndex) => (
        <div
          key={opt.id}
          className="radio-wrapper relative flex gap-2 mb-[27px] rounded-[10px] items-center justify-between"
        >
          <Input
            placeholder={`Variyant-${optionsIndex + 1}`}
            className="text-white w-full"
            error={errors.questions?.[index]?.options?.[optionsIndex]?.answerText
              ?.message}
            {...register(
              `questions.${index}.options.${optionsIndex}.answerText`
            )}
          
          />
          {options.length > 1 && (
            <button
              type="button"
              className="border-2 px-3 py-3 rounded-[10px] cursor-pointer border-[red]"
              onClick={() => removeOption(optionsIndex)}
            >
              <Trash2 size={15} color="red" />
            </button>
          )}
        </div>
      ))}

      <Button
        type="button"
        className="border w-full border-white text-white cursor-pointer"
        onClick={() => appendOption({ answerText: "", isCorrect: false })}
      >
        Varyant qo’shish +
      </Button>

      <div className="options my-8">
        <span className="text-[16px] sm:text-[20px] font-medium text-white mb-2 inline-block">
          To’g’ri javobni tanlang
        </span>
        <Controller
          control={control}
          name={`questions.${index}.correctOption`}
          render={({ field }) => (
            <Select
              {...field}
              placeholder="Tanlash"
              className="w-full border border-white rounded-[10px] bg-transparent"
              options={watchedOptions.map((op, ind) => ({
                value: ind,
                label: op.answerText || `Variyant-${ind + 1}`,
              }))}
              value={field.value ?? ""}
              onChange={(val) => {
                field.onChange(val);
                setCorrectQuizId(val); 
              }} 
            />
          )}
        />
      </div>
    </div>
  );
}

export default QuestionBlock;
