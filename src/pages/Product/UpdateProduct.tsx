import DatePickerOne from "../../components/Forms/DatePicker/DatePickerOne";
import DatePickerTwo from "../../components/Forms/DatePicker/DatePickerTwo";
import SwitcherFour from "../../components/Switchers/SwitcherFour";
import SwitcherOne from "../../components/Switchers/SwitcherOne"
import SwitcherTwo from "../../components/Switchers/SwitcherTwo"
import DefaultLayout from "../../layout/DefaultLayout"
import SwitcherThree from './../../components/Switchers/SwitcherThree';
import CheckboxOne from './../../components/Checkboxes/CheckboxOne';
import CheckboxThree from './../../components/Checkboxes/CheckboxThree';
import CheckboxFour from "../../components/Checkboxes/CheckboxFour";
import CheckboxFive from "../../components/Checkboxes/CheckboxFive";
import CheckboxTwo from "../../components/Checkboxes/CheckboxTwo";
import SelectGroupTwo from "../../components/Forms/SelectGroup/SelectGroupTwo";
import MultiSelect from "../../components/Forms/MultiSelect";

function UpdateProduct() {
  return (
    <DefaultLayout>

      <form >
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Update Products
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">

              <div>
                <label htmlFor="productNameEn" className="mb-3 block text-black dark:text-white">
                  Product Name in Arabic:
                </label>
                <input
                  type="text"
                  id="productNameEn"
                  name="name_ar"
                  placeholder="Default Input"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="productNameEn" className="mb-3 block text-black dark:text-white">
                  Product Name in English:
                </label>
                <input
                  type="text"
                  id="productNameEn"
                  placeholder="Default Input"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="productNameEn" className="mb-3 block text-black dark:text-white">
                  Product Name in Arabic:
                </label>
                <input
                  type="text"
                  id="productNameEn"
                  placeholder="Default Input"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="productNameEn" className="mb-3 block text-black dark:text-white">
                  Product Name in English:
                </label>
                <input
                  type="text"
                  id="productNameEn"
                  placeholder="Default Input"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="productNameEn" className="mb-3 block text-black dark:text-white">
                  Price:
                </label>
                <input
                  type="text"
                  id="productNameEn"
                  placeholder="Default Input"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>
          </div>

          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Photo upload
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  First Photo
                </label>
                <input
                  type="file"
                  className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                />
              </div>
            </div>
          </div>


          <button type="submit" className="inline-flex items-center justify-center rounded-md bg-black py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">Add</button>
        </div>
      </form>

    </DefaultLayout>
  )
}

export default UpdateProduct
