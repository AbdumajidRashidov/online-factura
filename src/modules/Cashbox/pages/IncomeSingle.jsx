import React from "react";

import { AttachFile, Button, PageHeading, Typography } from "components";

import "../style/cashbox.scss";
import { ReactComponent as PrintIcon } from "assets/icons/print.svg";
import { ReactComponent as DownloadIcon } from "assets/icons/download.svg";
import { ReactComponent as CloseIcon } from "assets/icons/btn-close.svg";
import { ReactComponent as CheckIcon } from "assets/icons/check.svg";
import documentImg from "assets/images/document.png";

const IncomeSingle = () => {
	return (
		<>
			<PageHeading
				links={[
					{ link: "/", label: "Главная" },
					{ link: "/", label: "Кассa" },
					{ label: "Счет-фактура №03-60378 от 31.03.2021" },
				]}
			/>

			<div className="row">
				<div className="col-7">
					<div className="account-card">
						<div className="account-card__header">
							<div>
								<Typography Type="h3" text="Счет-фактура" />
								<Typography Type="p" text="№03-60378 от 31.03.2021" />
								<Typography Type="p" className="num" text="566800736" />
							</div>
							<Typography Type="span" text="Статус документа в ГНК" />
						</div>
						<div className="account-card__main">
							<Typography Type="p" text="Отправитель:" />
							<Typography
								Type="p"
								className="name"
								text='ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ "VENKON GROUP"'
							/>
						</div>
						<div className="account-card__footer">
							<div>
								<Typography Type="span" text="Дата:" />
								<Typography Type="p" text="2021-04-09 12:40:13" />
							</div>
							<div className="buttons">
								<Button
									className="btn btn-sm mr_15"
									design="primary"
									prepend={<DownloadIcon className="mr_10" />}
									text={"Скачать"}
								/>
								<Button
									className="btn btn-sm"
									prepend={<PrintIcon className="mr_10" />}
									design="primary"
									text={"Печать"}
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="col-5">
					<div className="status-card">
						<div className="status-card__header">
							<div>
								<Typography Type="h3" text="Статус: " />
								<Typography Type="p" text="ОЖИДАЕТ ВАШЕЙ ПОДПИСИ" />
							</div>
							<AttachFile className="attach-file" />
						</div>
						<dir className="buttons d-flex">
							<Button
								design="pink"
								type="button"
								className="btn mt_20 mr_20 d-flex align-items-center justify-content-between"
								text="Отказаться"
								prepend={<CloseIcon className="mr_10" />}
							/>
							<Button
								design="primary"
								type="button"
								className="btn mt_20 d-flex align-items-center justify-content-between"
								text="Подписать"
								prepend={<CheckIcon className="mr_10" />}
							/>
						</dir>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-12 mt_20">
					<div className="wrapper">
						<img src={documentImg} alt="doc" />
					</div>
				</div>
			</div>
		</>
	);
};

export default IncomeSingle;
